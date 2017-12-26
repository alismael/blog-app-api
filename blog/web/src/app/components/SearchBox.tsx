import * as React from "react"
import AutoComplete from 'material-ui/AutoComplete'

const styles = {
    searchBox: {
        height: 60,
        width: 500,
        top: -7
    } as React.CSSProperties
};

export interface ISearchBoxProps {

}

class SearchBox extends React.Component<ISearchBoxProps> {
	/**
	 * Class constructor.
	 */
    constructor(props: ISearchBoxProps) {
        super(props);
    }

    state = {
        dataSource: [],
      };
    
      handleUpdateInput = (value: string) => {
        this.setState({
          dataSource: [
            value,
            value + value,
            value + value + value,
          ],
        });
      };

    // Render the component.
    render() {

        return (

            <AutoComplete
                hintText="Search blogs"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText="Search blogs"
                style={styles.searchBox}
                fullWidth={true}
            />

        );
    }

}

export default SearchBox;