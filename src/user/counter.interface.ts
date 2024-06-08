export interface Counter extends Document {
    _id: string;
    seq: number;
    value: number;
}