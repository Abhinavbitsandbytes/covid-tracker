import React from 'react'
import styles from "./Table.module.css";
 import ReactPaginate from 'react-paginate';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredCountriesData: this.props.countries,
            isAscending: 1,
            searchItems: '',
            fieldToSort: "",
            tableData: [],
            ld: [],
            offset: 0,
            perPage: 10,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        var slice = this.props.countries.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(this.props.countries.length / this.state.perPage),
            tableData: slice,
            ld: slice
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };
    loadMoreData() {
        const data = this.state.filteredCountriesData;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tableData: slice,
            ld: slice
        })
    }
    sortCounteries = (orderBy) => {
        const tableData = this.state.tableData;
        tableData.sort((a, b) => (a[orderBy] > b[orderBy]) ? this.state.isAscending : this.state.isAscending * -1)
        this.setState({
            tableData,
            isAscending: (this.state.isAscending * -1),
            fieldToSort: orderBy,
        })
    }
    handleUserInput = (event) => {
        let searchItems = event.target.value
        let subStr = searchItems.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let filteredCounteries = this.state.ld?.filter(country => {
            return country.Country.toLowerCase().search(
                subStr.toLowerCase()
            ) !== -1;
        });
        this.setState({ tableData: filteredCounteries, searchItems })
    }

    render() {
        const { searchItems, fieldToSort, isAscending, tableData } = this.state
        return (
            <React.Fragment>
                <div className={styles.table_container}>
                    <p>Countries</p>
                    <div className={styles.text_field}>
                        <input type="text" placeholder="Search" onChange={(event) => this.handleUserInput(event)}></input>
                        {tableData.length < 1 && <div>No result found for {searchItems}</div>}
                    </div>
                    {tableData.length > 0 && <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <label onClick={() => this.sortCounteries("Country")}>Name</label>
                                        {fieldToSort === "Country" && isAscending === -1 && (
                                            <i class="fas fa-angle-up"></i>
                                        )}
                                        {fieldToSort === "Country" && isAscending === 1 && (
                                            <i class="fas fa-angle-down"></i>
                                        )}
                                    </th>
                                    <th >
                                        <label onClick={() => this.sortCounteries("TotalConfirmed")}>Confirmed</label>
                                        {fieldToSort === "TotalConfirmed" && isAscending === -1 && (
                                            <i class="fas fa-angle-up"></i>
                                        )}
                                        {fieldToSort === "TotalConfirmed" && isAscending === 1 && (
                                            <i class="fas fa-angle-down"></i>
                                        )}
                                    </th>
                                    <th>
                                        <label onClick={() => this.sortCounteries("TotalRecovered")}>Recovered</label>
                                        {fieldToSort === "TotalRecovered" && isAscending === -1 && (
                                            <i class="fas fa-angle-up"></i>
                                        )}
                                        {fieldToSort === "TotalRecovered" && isAscending === 1 && (
                                            <i class="fas fa-angle-down"></i>
                                        )}
                                    </th>
                                    <th>
                                        <label onClick={() => this.sortCounteries("TotalDeaths")}>Deaths</label>
                                        {fieldToSort === "TotalDeaths" && isAscending === -1 && (
                                            <i class="fas fa-angle-up"></i>
                                        )}
                                        {fieldToSort === "TotalDeaths" && isAscending === 1 && (
                                            <i class="fas fa-angle-down"></i>
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, index) => {
                                    const country = data.Country
                                    const confirmed = data.TotalConfirmed
                                    const recovered = data.TotalRecovered
                                    const deaths = data.TotalDeaths

                                    return (
                                        <tr key={index}>
                                            <td >
                                                <span className={styles.country_name}>
                                                    {country}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {confirmed}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {recovered}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {deaths}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
<ReactPaginate
previousLabel={"prev"}
nextLabel={"next"}
breakLabel={"..."}
breakClassName={"break-me"}
pageCount={this.state.pageCount}
marginPagesDisplayed={2}
pageRangeDisplayed={5}
onPageChange={this.handlePageClick}
containerClassName={"pagination"}
subContainerClassName={"pages pagination"}
activeClassName={"active"}/>
            
                     </div>}
                </div>
             </React.Fragment>
         )
     }
}

 export default Table
