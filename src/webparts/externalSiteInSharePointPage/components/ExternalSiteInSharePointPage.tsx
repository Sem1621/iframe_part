import * as React from 'react';
import styles from './ExternalSiteInSharePointPage.module.scss';
import { IExternalSiteInSharePointPageProps } from './IExternalSiteInSharePointPageProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

interface IExternalSiteInSharePointPageState {
  _dataset: any[];
  _connectionStatus: boolean;
  _readyPage: boolean;
  _sourcesite: string;
}

export default class ExternalSiteInSharePointPage extends React.Component<IExternalSiteInSharePointPageProps, IExternalSiteInSharePointPageState, {}> {
  //iframeRef: React.RefObject<HTMLIFrameElement>;
  iframeRef = (iframe: HTMLIFrameElement) => {
    //let current = iframe;
    //let document = current.contentWindow.document;
    //console.log(document);
    console.log('aaaaa')
    iframe.addEventListener('load', () => {
      let current = iframe;
      let document = current.contentWindow;
      console.log('bbbbb');
      console.log(document)
    })
  }

  //#region Costruttore
  constructor(props: IExternalSiteInSharePointPageProps, state: IExternalSiteInSharePointPageState) {
    super(props);
    this.state = {
      _dataset: [],
      _connectionStatus: false,
      _readyPage: false,
      _sourcesite: this.props.site
    };
    //this.iframeRef = React.createRef();
  }
  //#endregion

  //#region Metodo per verificare se si è connessi alla vpn
  /** Solo se connessi alla vpn si può raggiungere il sito https://inpsservice.it/
   * restituisce un valore booleano
  */
//   private async checkConnection() {
//     let resultOperation: boolean = false;
//     try {
// //      await this.props.context.httpClient.get("https://inpsservice.it/", HttpClient.configurations.v1)
//       const requestHeaders: Headers = new Headers();

//       requestHeaders.append("Content-type", "application/textplain");
//       requestHeaders.append("Accept", "application/textplain");
//       requestHeaders.append("Access-Control-Allow-Origin", window.location.origin);
//       requestHeaders.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
//       requestHeaders.append("Access-Control-Allow-Methods", "GET, OPTIONS");
//       requestHeaders.append("Access-Control-Max-Age", "1728000");
//       requestHeaders.append("Origin", window.location.origin);
//       requestHeaders.append("mode","no-cors");
//       const httpClientOptions: IHttpClientOptions = {
//           headers: requestHeaders,
//           method: "GET"
//       };
//       await this.props.context.httpClient.get(this.state._sourcesite,HttpClient.configurations.v1,httpClientOptions)
//         .then((res: HttpClientResponse): any => {
//           console.log(res)
//           return res.ok;
//         })
//         .then((data: any): void => {
//            console.log(data)
//           if (data == true)
//             resultOperation = true;
//         })
//         .catch(err => {
//            console.log(err)
//           resultOperation = false;
//         });
//     } catch (ex) {
//        console.log(ex)
//       resultOperation = false;
//     }
//     finally {
//     	 console.log(resultOperation);
//       resultOperation = true;
//       return resultOperation;
//     }
//   }
  //#endregion

  //#region Metodo componentDidMount per l'elaborazione dei dati
  public componentDidMount() {
   //  let isVpn: boolean = await this.checkConnection();

   //  /**Se la connessione ha avuto successo, setta _connectionStatus a true.
   //   * Se la connessione è fallita, setta _connectionStatus a false.
   //   */
   //  if (isVpn) {
   //    this.setState({ _connectionStatus: true });
   //  }
   //  else {
   //    this.setState({ _connectionStatus: false });
   //  }
   this.setState({ _readyPage: true });
   this.setState({_connectionStatus: true});
  }

	showError(){
      let iframe = document.getElementById('iframeId');
      console.log(iframe)
      let iframeDoc = iframe;
      console.log(iframeDoc)
      // if(iframeDoc.body.classList.contains('neterror')){
      //     console.log(iframeDoc.body)
      //    this.setState({_connectionStatus: false});
      // }
    }

  //#endregion

  /**Render-- se la pagina è pronta, quindi sappiamo se siamo connessi o meno alla vpn:
     * mostra l'iframe o il messaggio di errore;
     * in caso contrario mosterà il loaderDiv.
     */
  public render(): React.ReactElement<IExternalSiteInSharePointPageProps> {
    return (
      <div className={styles.externalSiteInSharePointPage}>
        {this.state._readyPage ?
          this.state._connectionStatus ?
            <div className="iframeDiv" style={{ width: `${this.props.width}`, height: `${this.props.height}` }}>
              <iframe ref={this.iframeRef}  id='iframeId' style={{ width: `${this.props.iframeWidth}%`, height: `${this.props.iframeHeight}%` }} src={this.props.site}>
              </iframe>
            </div>
            :
            <div className="errorLoadPage">
              <img className="lockImg" src="/sites/PrototipoIntranetInps/_catalogs/masterpage/InpsMasterPage/images/iconLock.png" />
              <h1>Errore nel caricamento della pagina. Assicurarsi di essere connessi alla VPN.</h1>
            </div>
          :
          <div className="loaderDiv">
            <svg className="loader" version="1.1" width="512" height="512" viewBox="0 0 512 512">
              <path fill="#4468d6" d="M256.011 0c-12.852 0-23.273 10.42-23.273 23.273v93.091c0 12.854 10.421 23.274 23.273 23.274 12.853 0 23.272-10.421 23.272-23.274v-93.091c0-12.853-10.419-23.273-23.272-23.273z"></path>
              <path fill="#4468d6" opacity="0.4" d="M256.011 372.363c-12.852 0-23.273 10.421-23.273 23.272v93.091c0 12.853 10.421 23.274 23.273 23.274 12.853 0 23.272-10.421 23.272-23.274v-93.091c0-12.853-10.419-23.272-23.272-23.272z"></path>
              <path fill="#4468d6" opacity="0.8" d="M173.725 140.809l-65.826-65.828c-9.086-9.089-23.822-9.089-32.912 0-9.089 9.089-9.089 23.824 0 32.912l65.826 65.828c4.544 4.544 10.5 6.816 16.455 6.816s11.912-2.273 16.455-6.816c9.090-9.089 9.090-23.823 0.001-32.912z"></path>
              <path fill="#4468d6" opacity="0.1" d="M459.806 232.727h-46.546c-12.853 0-23.272 10.421-23.272 23.273 0 12.853 10.419 23.272 23.272 23.272h46.546c12.853 0 23.272-10.419 23.272-23.273 0-12.852-10.421-23.273-23.272-23.273z"></path>
              <path fill="#4468d6" opacity="0.3" d="M365.557 338.281c-9.087-9.089-23.823-9.087-32.913 0-9.088 9.089-9.087 23.823 0 32.913l65.828 65.825c4.544 4.544 10.502 6.817 16.457 6.817 5.957 0 11.913-2.274 16.455-6.817 9.089-9.089 9.089-23.825 0-32.913l-65.828-65.825z"></path>
              <path fill="#4468d6" opacity="0.6" d="M139.637 256c0-12.852-10.421-23.273-23.273-23.273h-93.091c-12.853 0-23.273 10.421-23.273 23.273 0 12.853 10.42 23.272 23.273 23.272h93.091c12.852 0 23.273-10.419 23.273-23.273z"></path> <path fill="#4468d6" opacity="0.5" d="M173.735 338.283c-9.087-9.089-23.825-9.089-32.912 0l-65.825 65.825c-9.089 9.087-9.089 23.825 0 32.913 4.544 4.544 10.501 6.815 16.457 6.815s11.913-2.271 16.455-6.815l65.825-65.825c9.089-9.087 9.089-23.822 0-32.911z"></path>
            </svg>
          </div>
        }
      </div>
    );
  }
}
