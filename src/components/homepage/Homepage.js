import React from 'react';
import Table from '../table/Table';
import Graph from '../graph/Graph';


const API_URL = "https://api.covid19api.com/summary"

class Homepage extends React.Component{
    constructor(props){
    super(props)
        this.state={
            data:null
        }
    }
async getData(){
    const api_call = await fetch(API_URL);
    const response = await api_call.json();
    this.setState({data:response})
}
    componentDidMount(){     
this.getData()
    }
    render(){
        const {data} = this.state
        return(
            <React.Fragment>
                {data && <div>
                    <Graph global={data.Global}></Graph>
                 <Table countries={data.Countries}></Table>
                 </div>}
            </React.Fragment>
        )
    }
}

export default Homepage