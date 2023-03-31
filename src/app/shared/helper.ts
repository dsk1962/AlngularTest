import { IWidget } from '../model/i-widget';
export class Helper {

    static getControlName(iWidget: IWidget): string {
        if (iWidget?.name) return iWidget.name;
        if (iWidget.id) return iWidget.id.toString();
        return '';
    }
}
