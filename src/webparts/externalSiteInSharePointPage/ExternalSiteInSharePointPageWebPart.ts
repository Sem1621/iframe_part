import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'ExternalSiteInSharePointPageWebPartStrings';
import ExternalSiteInSharePointPage from './components/ExternalSiteInSharePointPage';
import { IExternalSiteInSharePointPageProps } from './components/IExternalSiteInSharePointPageProps';

export interface IExternalSiteInSharePointPageWebPartProps {
  description: string;
  context: WebPartContext;
  site: string;
  height: number;
  iframeHeight: number;
  width: number;
  iframeWidth: number;
}

export default class ExternalSiteInSharePointPageWebPart extends BaseClientSideWebPart<IExternalSiteInSharePointPageWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IExternalSiteInSharePointPageProps> = React.createElement(
      ExternalSiteInSharePointPage,
      {
        description: this.properties.description,
        context: this.context,
        site: this.properties.site,
        height: this.properties.height,
        iframeHeight: this.properties.iframeHeight,
        width: this.properties.width,
        iframeWidth: this.properties.iframeWidth
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**Dal pannello di configurazione ricavo: il sito che voglio visualizzare nell'iframe, l'altezza e la larghezza del div che
   * contiene l'iframe e l'altezza e la larghezza dell'iframe
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('site', {
                  label: 'Inserisci un sito',
                  value: ''
                }),
                PropertyPaneTextField('height', {
                  label: 'Altezza',
                  value: '900px',
                }),
                PropertyPaneSlider('iframeHeight', {
                  label: 'Altezza frame',
                  min: 0,
                  max: 100,
                }),
                PropertyPaneTextField('width', {
                  label: 'Larghezza',
                  value: '100%',
                }),
                PropertyPaneSlider('iframeWidth', {
                  label: 'Larghezza frame',
                  min: 0,
                  max: 100,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
