import React, { Component } from 'react';
import axios from 'axios';
import '../css/style.css'

class GetTempo extends Component {
    constructor() {
        super();
        this.state = {
            tempo : {},
            flag: false
        }
        this.getTime = this.getTime.bind(this);
        this.willReRender = this.willReRender.bind(this);
    };
    
    getTime(oni, est) {
        console.log(this.state.flag);
        let coords = `wp.0=${oni}&wp.1=${est}`;
        const bingKey = "AqxO5kBZ9WGyR8O4QlMb47TAlKui5SZoE2Ggm62NrD2CiCbWxu3c-j_o63uXEgnp";
        axios.get(`http://dev.virtualearth.net/REST/V1/Routes?${coords}&key=${bingKey}`)
        // axios.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${oni}&destinations=${est}&travelMode=driving&key=${bingKey}`)
        .then(response => {
            this.setState({
                tempo: response.data.resourceSets[0].resources[0].travelDurationTraffic/60,
                // tempo : response.data.resourceSets[0].resources[0].results[0].travelDuration,
                flag: true
            });
        })
    }

    willReRender(){
        console.log(this.state.flag);
        if(this.state.flag === true){
            this.setState({flag: false});
        }
    }

    componentDidMount(){
        if(this.state.flag === false){
            this.getTime(this.props.coordsOni, this.props.coordsEst);
        }
    }
    
    render() {
        let tempo = null
        if(Number.parseInt(this.state.tempo) <= 1) {
            tempo = "Já";
        }else {
            tempo = Number.parseInt(this.state.tempo) + " Min";
        }
        
        
        // 
        window.setTimeout(this.willReRender,2000);
        return(
            <div> <i className="fs12">{tempo}</i> </div>
        )
    }
}
export default GetTempo;