import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IExternalSiteInSharePointPageProps {
  description: string;
  context: WebPartContext;
  site: string;
  height: number;
  iframeHeight: number;
  width: number;
  iframeWidth: number;
}
