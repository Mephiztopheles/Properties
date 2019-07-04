import Property from "../Property.js";
export default class ReadOnlyRegExProperty extends Property<RegExp> {
    value: RegExp;
}
