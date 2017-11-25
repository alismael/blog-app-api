import * as React from "react";

export interface HelloProps { username: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello {this.props.username}!</h1>;
    }
}