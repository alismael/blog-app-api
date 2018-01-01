import * as React from "react"
import { Input } from 'antd';
const Search = Input.Search;

export interface ISearchBoxProps {

}

class SearchBox extends React.Component<ISearchBoxProps> {

	// Render the component.
	render() {

		return (
			<Search style={{height: "40px"}} placeholder="search for blogs" enterButton="Search" size="large" />
		);
	}

}

export default SearchBox;