import Profile from '../../assets/images/profile.webp'
import Logo from '../../assets/icons/logo_v2_.svg'

let usbDevice = null;
const $etiqueta_zpl_code = `^XA

^FX Top section with logo, name and address.
^CF0,60
^FO50,50^GB100,100,100^FS
^FO75,75^FR^GB100,100,100^FS
^FO93,93^GB40,40,40^FS
^FO220,50^FDIntershipping, Inc.^FS
^CF0,30
^FO220,115^FD1000 Shipping Lane^FS
^FO220,155^FDShelbyville TN 38102^FS
^FO220,195^FDUnited States (USA)^FS
^FO50,250^GB700,3,3^FS

^FX Second section with recipient address and permit information.
^CFA,30
^FO50,300^FDJohn Doe^FS
^FO50,340^FD100 Main Street^FS
^FO50,380^FDSpringfield TN 39021^FS
^FO50,420^FDUnited States (USA)^FS
^CFA,15
^FO600,300^GB150,150,3^FS
^FO638,340^FDPermit^FS
^FO638,390^FD123456^FS
^FO50,500^GB700,3,3^FS

^FX Third section with bar code.
^BY5,2,270
^FO100,550^BC^FD12345678^FS

^FX Fourth section (the two boxes on the bottom).
^FO50,900^GB700,250,3^FS
^FO400,900^GB3,250,3^FS
^CF0,40
^FO100,960^FDCtr. X34B-1^FS
^FO100,1010^FDREF1 F00B47^FS
^FO100,1060^FDREF2 BL4H8^FS
^CF0,190
^FO470,955^FDCA^FS

^XZ`;

const Home = () => {
  const connect = async () => {
    if (!usbDevice) return;

    await usbDevice.open();
    if (usbDevice.configuration === null) {
        await usbDevice.selectConfiguration(1);
    }

    // Reclamar la interfaz de la impresora
    await usbDevice.claimInterface(0);

    // Verificar la configuración de las interfaces
    console.log(usbDevice.configuration.interfaces);

    // Obtenemos los endpoints
    const interfaces = usbDevice.configuration.interfaces;
    let endpointNumber = null;

    // Buscar el endpoint de salida
    interfaces.forEach(myinterface => {
        myinterface.alternates.forEach(alternate => {
            alternate.endpoints.forEach(endpoint => {
                if (endpoint.direction === 'out') {
                    endpointNumber = endpoint.endpointNumber;
                }
            });
        });
    });

    if (endpointNumber === null) {
        console.error("No se encontró un endpoint de salida.");
        return;
    }

    console.log("Usando el endpoint: ", endpointNumber);

    // Convertir la cadena ZPL en bytes
    const encoder = new TextEncoder();
    const data = encoder.encode($etiqueta_zpl_code);

    // Enviar los datos a la impresora usando el endpoint correcto
    await usbDevice.transferOut(endpointNumber, data);
    console.log("Etiqueta enviada a la impresora.");
  }

  const handleRequest = () => {
    navigator.usb.requestDevice({ filters: [] })
    .then(device => {
        if (!device) return;
        usbDevice = device;
        return connect();
    })
    .catch(error => console.log(error));
  }

  const handleRequestPrint = () => {
    navigator.usb.getDevices().then(devices => {
      if (devices.length == 0) handleRequest();

      usbDevice = devices[0];
      connect();
    });
  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col justify-start'>
          <div className='relative w-fit h-fit flex border-[0.6rem] border-solid border-clr-project-main-light rounded-full'>
            <img src={Profile} alt='profile' className='w-64 h-64 rounded-full' />
            <img src={Logo} alt='logo' className='w-16 h-16 absolute rounded-full right-1 bottom-1' />
          </div>
          <h1>Comming soon...</h1>

          <button onClick={handleRequestPrint}>Request Print</button>
        </div>
      </div>
    </>
  )
}

export default Home
