import React from 'react';

import UIPureComponent from 'components/UIPureComponent';
import NumberInput from 'components/inputs/NumberInput';
import RangeInput from 'components/inputs/RangeInput';
import SelectInput from 'components/inputs/SelectInput';
import { Control, Option } from 'components/controls/Control';

const types = [
    'Square',
    'Hexagon'
];

const MIN_PIXEL_SIZE = 2;
const MAX_PIXEL_SIZE = 240;

export default class PixelateControl extends UIPureComponent {
    constructor(props) {
        super(props);

        this.state = this.props.display.options;
    }

    onChange(name, val) {
        let obj = {},
            display = this.props.display;

        obj[name] = val;

        this.setState(obj, () => {
            display.update(obj);
        });
    }

    render() {
        const { active } = this.props,
            { type, size } = this.state;

        return (
            <Control label="PIXELATE" active={active}>
                <Option label="Type">
                    <SelectInput
                        name="type"
                        width={140}
                        items={types}
                        value={type}
                        onChange={this.onChange}
                    />
                </Option>
                <Option label="Size">
                    <NumberInput
                        name="size"
                        width={40}
                        value={size}
                        min={MIN_PIXEL_SIZE}
                        max={MAX_PIXEL_SIZE}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="size"
                            min={MIN_PIXEL_SIZE}
                            max={MAX_PIXEL_SIZE}
                            value={size}
                            onChange={this.onChange}
                        />
                    </div>
                </Option>
            </Control>
        );
    }
}