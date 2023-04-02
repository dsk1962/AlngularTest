import { Input } from '@angular/core';
import { WIDGET_TYPES, LAYOUT_TYPES, LABEL_POSITION } from '../model/i-widget';


export class BaseWidget {
    widgetDefinition: any
    public getClassName(): string {
        let result = '';
        switch (this.widgetDefinition?.type) {
            case WIDGET_TYPES.CONTAINER: {
                result = 'dynamic-container '
                switch (this.widgetDefinition?.layout) {
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
                result += (this.widgetDefinition?.config?.labelPosition == LABEL_POSITION.TOP ? ' labeltop' : ' grid');
                break;
            }
            case WIDGET_TYPES.BUTTON: {
                result = 'p-button ';
                break;
            }
        }
        if (this.widgetDefinition?.classNames)
            result += this.widgetDefinition.classNames;
        return result;
    }
}
