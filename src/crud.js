import React, { Component } from 'react';
import './App.css';

class Crud extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: '',
            nit: '',
            address: '',
            make: '',
            pappers: '',
            patners : [],
            response : ''
        }
    }


    Consultar(){
        const urlapi = "http://localhost:3000/patner/"
        fetch(urlapi)
        .then(res => res.json())
        .then(
            (result)=>{
                this.setState({
                    patners : result
                })
            },
        )
    }

    Registrar(){
        let papel=this.state.pappers
        var data ={
            name:this.state.name,
            nit:this.state.nit,
            address:this.state.address,
            make:this.state.make,
            papper:papel
        };

        fetch('http://localhost:3000/patner',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        })
        .then(
            (result)=>{
                this.setState({
                    response : result
                })
            },
            (error) => {
                alert(error)
            }
        )
        window.location.reload(false)

    }

    Eliminar(id){
        const {patners} = this.state
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('GET', 'POST', 'DELETE','OPTIONS');

        const urlapi = "http://localhost:3000/patner/"+id
        const option ={
            method: 'DELETE',
            headers: headers,
            mode:'cors'
          }
        fetch(urlapi,option)
        .then(res => res.json())
        .then(
            (result)=>{
                this.setState({
                    response : result,
                    patners: patners.filter(patner => patner.nit !== id)
                })
            },
        )
    }

    Actualizar(id){
        let papel=this.state.pappers
        var data ={
            name:this.state.name,
            nit:id,
            address:this.state.address,
            make:this.state.make,
            papper:papel
        };
        
        fetch('http://localhost:3000/patner',{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        })
        .then(
            (result)=>{
                this.setState({
                    response : result
                })
            },
        )
        window.location.reload(false)
    }
    

    componentDidMount(){
        this.Consultar();
    }

render(){
    return(
        <div className="container">
            &nbsp;
            <div className="row">
                <div className="col">
                    <form id="formulario">
                        <div className="form-group">
                            <label>nombre</label>
                            <input class="form-control" value={this.state.name} onChange={(nam)=> this.setState({name:nam.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>nit</label>
                            <input class="form-control" value={this.state.nit} onChange={(ni)=> this.setState({nit:ni.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>address</label>
                            <input class="form-control" value={this.state.address} onChange={(add)=> this.setState({address:add.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>make</label>
                            <input class="form-control" value={this.state.make} onChange={(mak)=> this.setState({make:mak.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>papper</label>
                            <input class="form-control" value={this.state.pappers} onChange={(pa)=> this.setState({pappers:pa.target.value})}/>
                        </div>
                    </form>
                    <button onClick={() => this.Registrar()} className="btn btn-outline-primary">CREATE</button>

                </div>
                <div class="card">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>NAME</th>
                        <th>NIT</th>
                        <th>ADDRESS</th>
                        <th>MAKE</th>
                        <th>PAPPER</th>
                        <th className="th">OPCIONES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.patners.map(patner => (
                        <tr key={patner.nit}>
                        <td>{patner.name}</td>
                        <td>{patner.nit}</td>
                        <td>{patner.address}</td>
                        <td>{patner.make}</td>
                        <td>{patner.papper}</td>
                        <td>
                            <button onClick={() => this.Actualizar(patner.nit)} className="btn btn-outline-success">U</button>
                            &nbsp;
                            <button onClick={() => this.Eliminar(patner.nit)} className="btn btn-outline-danger">D</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

}

export default Crud;



