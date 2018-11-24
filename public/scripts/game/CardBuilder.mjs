import {GoldCard, KillCard, EmptyCard} from './Card.mjs';

let CARDTYPES = {};
CARDTYPES.DEFAULT = 0;
CARDTYPES.GOLD = 1;
CARDTYPES.KILL = 2;

export default class CardBuilder {
	static build(id) {
		switch (id) {
		case CARDTYPES.GOLD:
			return new GoldCard();
		case CARDTYPES.KILL:
			return new KillCard();
		default:
			return new EmptyCard();
		}
	}
}

