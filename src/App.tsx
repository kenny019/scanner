import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import './App.css';

const forkScanners = [
  '164.92.191.219',
  '206.189.33.200',
  '134.122.38.54',
  '164.92.157.54',
  '188.166.145.51',
  '165.232.134.41',
];
type forkData = {
  ip: string;
  validator?: string;
  nodes: nodeData[];
  status: 'connecting' | 'connected';
};

type nodeData = {
  block?: string;
  height?: number;
  ip_address?: string;
  location?: string;
};

type activeBlockData = {
  block: string;
  height: number;
  id: number;
  node: number;
  parent_block: string;
  parent_chaintip?: string;
  status?: string;
};

enum CONNECTION_CODE {
  Connecting = 0,
  Connected = 1,
  Disconnecting = 2,
  Disconnected = 3,
}

const forkDataRecord = new Map(
  forkScanners.map((ip) => [
    ip,
    {
      ip,
      validator: 'loading...',
      nodes: [],
      status: 'connecting',
    },
  ])
) as Map<string, forkData>;

function mapConnectionColor(statusCode: number) {
  switch (statusCode) {
    case 0:
      return 'text-zinc-300';
    case 1:
      return 'text-green-300';
    case 2:
      return 'text-yellow-300';
    case 3:
      return 'text-red-300';
    default:
      return 'text-zinc-300';
  }
}

function App() {
  const [scannerData, setScannerData] = useState(forkDataRecord);
  const [socketState, setSocketState] = useState<Record<string, WebSocket | undefined>>({});

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState<nodeData[] | undefined>();

  const updateScannerData = (k: string, v: forkData) => {
    setScannerData(new Map(scannerData.set(k, v)));
  };

  function setupSocketConnection(ip: string) {
    const ws = new WebSocket(`ws://${ip}:6001`);
    console.log(`connecting to ${ip}`);
    setSocketState((oldState) => ({
      ...oldState,
      [ip]: ws,
    }));

    ws.addEventListener('open', () => {
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 'forks',
          method: 'subscribe_forks',
          params: null,
        })
      );
    });

    ws.addEventListener('message', handleMessageCallback);

    ws.onclose = () => {
      const currentScannerData = scannerData.get(ip);

      if (!currentScannerData) return;

      setTimeout(() => {
        setupSocketConnection(ip);
      }, 10000);
    };
  }

  function handleCallbackMethods(ip: string, method: string, data: Record<string, any>) {
    switch (method) {
      case 'active_fork': {
        break;
      }

      case 'forks': {
        const forkNodes = data.params as activeBlockData[];

        const currentScannerData = scannerData.get(ip);

        if (!currentScannerData) return;

        currentScannerData.nodes = forkNodes;
        updateScannerData(ip, currentScannerData);
      }
    }
    return;
  }

  function handleMessageCallback(event: MessageEvent<any>) {
    const currentIp = forkScanners.reduce((acc, ipAddr) => {
      if (event.origin.includes(ipAddr)) acc = ipAddr;
      return acc;
    }, '');

    if (!currentIp) return;

    if (!event.data) return;

    const receivedData = JSON.parse(event.data as string) as Record<string, any>;

    console.log(receivedData);

    handleCallbackMethods(currentIp, receivedData.method as string, receivedData);
  }

  // component lifecycle
  useEffect(() => {
    forkScanners.forEach((ip) => {
      setupSocketConnection(ip);
    });
  }, []);

  return (
    <>
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
          <Dialog.Content className='fixed left-[50%] top-[40%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-700 bg-zinc-800 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full'>
            <Dialog.Title className='text-lg font-semibold leading-none tracking-tight'>
              Connected Bitcoin Nodes
            </Dialog.Title>
            <Dialog.Description className=''>
              <ul className='overflow-y-auto max-h-[400px]'>
                {dialogData && dialogData.length > 0
                  ? dialogData.map((nodeData, id) => {
                      return (
                        <>
                          <h2 className='mb-2'>Node {id}</h2>
                          <li
                            key={id}
                            className='relative items-center mx-2 rounded-md mb-4 border-zinc-700 border'
                          >
                            <div className='leading-5 break-words flex flex-col border-b border-zinc-700 p-4 max-w-md'>
                              <label>Chaintip hash:</label>
                              <code className='text-zinc-300'>{nodeData.block}</code>
                            </div>
                            <div className='leading-5 break-words flex flex-col border-b border-zinc-700 p-4 max-w-md'>
                              <label>Chaintip height:</label>
                              <code className='text-zinc-300'>{nodeData.height}</code>
                            </div>
                            <div className='leading-5 break-words flex flex-col border-b border-zinc-700 p-4 max-w-md'>
                              <label>Node IP:</label>
                              <code className='text-zinc-300'>{nodeData.ip_address}</code>
                            </div>
                          </li>
                        </>
                      );
                    })
                  : 'No nodes connected'}
              </ul>
            </Dialog.Description>
            <Dialog.Close className='border-zinc-500'>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div>
        <div className='mx-auto max-w-7xl'>
          <div className='bg-zinc-800 rounded-md border border-zinc-700 py-10'>
            <div className='px-4 sm:px-6 lg:px-8'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-4xl font-semibold leading-6 text-white'>Fork Scanners</h1>
                </div>
              </div>
              <div className='mt-4 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <table className='min-w-full divide-y divide-zinc-700'>
                      <thead>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'
                          >
                            Fork scanner #
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            IP address
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Connection Status
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                          >
                            Nodes connected
                          </th>
                          <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                            <span className='sr-only'>Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-zinc-800'>
                        {Array.from(scannerData.values()).map((entry, id) => (
                          <tr key={id}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                              Fork Scanner {id + 1}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-zinc-300'>
                              {entry.ip}
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm ${mapConnectionColor(
                                socketState[entry.ip]?.readyState || 3
                              )}`}
                            >
                              {CONNECTION_CODE[socketState[entry.ip]?.readyState || 3]}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-zinc-300'>
                              {entry.nodes.length}
                            </td>
                            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
                              <button
                                className='bg-zinc-800 text-indigo-400 hover:text-indigo-300'
                                onClick={() => {
                                  setDialogData(entry.nodes);
                                  setOpenDialog(!openDialog);
                                }}
                              >
                                More Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
