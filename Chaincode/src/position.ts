/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Position {

    @Property()
    public latitude: Number;

    @Property()
    public longitude: Number;

    @Property()
    public timestamp: string;

}
