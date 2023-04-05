import { Input } from '@angular/core';
import { WIDGET_TYPES, LAYOUT_TYPES, LABEL_POSITION } from '../model/i-widget';
import { Helper } from '../shared/helper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


export class BaseWidget {
    widgetDefinition: any;
    HELPER = Helper;

    constructor(protected sanitizer: DomSanitizer) {
    }

    public getClassName(): string {
        return this.getWidgetClassName(this.widgetDefinition);
    }
    public getWidgetClassName(def: any): string {
        if (!def)
            def = this.widgetDefinition;
        let result = '';
        switch (def?.type) {
            case WIDGET_TYPES.CONTAINER: {
                result = 'dynamic-container '
                switch (def?.layout) {
                    case LAYOUT_TYPES.HORIZONTAL: {
                        result += 'hlayout '
                        break;
                    }
                    case LAYOUT_TYPES.VERTICAL: {
                        result += 'vlayout '
                        break;
                    }
                    default:
                        result += 'blayout ';
                }
                break;
            }
            case WIDGET_TYPES.INPUTFIELD: {
                result = 'p-component field dynamic-field ';
                result += (def?.config?.labelPosition == LABEL_POSITION.TOP ? ' labeltop ' : ' grid ');
                break;
            }
            case WIDGET_TYPES.BUTTON: {
                result = 'p-button ';
                break;
            }
        }
        if (def?.classNames)
            result += def.classNames;
        return result;
    }

    public getHtml(def: any): SafeHtml | null {
        if (def?.html)
            return this.sanitizer.bypassSecurityTrustHtml(def?.html);
        return null;
    }
}