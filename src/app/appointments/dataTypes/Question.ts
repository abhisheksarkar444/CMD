import { AnswerHint } from './AnswerHint';

export class Question {
    constructor(public questionText?: string, public questionDescription?: string,
        public hints?: AnswerHint[], public category?: string, public providerUniqueKey?: string, public questionID?: number
    ) {

    }
}
