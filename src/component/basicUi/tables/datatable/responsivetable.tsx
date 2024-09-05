import { Component } from 'react';
import { ReactTabulator } from "react-tabulator";
import { data, columns } from '../../../../common/tabledata';

class Home extends Component {

    state = {
        data: [],
        selectedName: ""
    };
    ref = null;

    rowClick = (_e:any, row:any) => {
        this.setState({ selectedName: row.getData().name });
    };

    setData = () => {
        this.setState({ data });
    };

    clearData = () => {
        this.setState({ data: [] });
    }
    render() {
        const options = {
            height: 300,
            movableRows: true,
            selectable: true,
            rowClick: (_e:any, row:any) => {

                this.setState({ selectedName: row.getData().name });
            },
            selectableCheck: function (row:any) {
                return row.getData().color !== "yellow"; //allow selection of rows where the age is greater than 18
            },
        }

        return (
            <>
                <div className="box-body space-y-3">
                    <div className='sortable-input '>Selected Name: <p>{this.state.selectedName}</p></div>
                    <div className="overflow-hidden table-bordered">
                        <div>
                            <ReactTabulator
                                onRef={(r) => (this.ref = r)}
                                data={data}
                                events={{ rowClick: this.rowClick }}
                                options={options}
                                data-custom-attr="test-custom-attribute"
                                className="ti-custom-table ti-striped-table ti-custom-table-hover"
                                columns={columns}
                            />
                        </div >
                    </div>
                </div>

            </>
        );
    }
}

export default Home;