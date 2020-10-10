import React from 'react';
import * as d3 from 'd3';

interface PreviewProps {

}

export class Preview extends React.Component<PreviewProps>{
    private container: React.RefObject<any>;

    constructor(props: PreviewProps) {
        super(props);

        this.container = React.createRef();
    }

    componentDidMount() {
        d3.select(this.container.current)
            .append("p")
            .text("Happy Coding with d3!");
    }

    public render(): React.ReactNode {
        return (
            <div ref={this.container}></div>
        );
    }
}