import './NavbarHeader.css';
import React, { Component } from "react";
import WebsiteLogo from '../websiteLogo.png'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

class NavbarHeader extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <nav class="navbar navbar-expand-md navbar-dark bg-black">
                <div class="container-fluid fixed-container">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse bg-black" id="navbarTogglerDemo02">
                        <a class="navbar-brand" href="#">
                            <img src={WebsiteLogo} alt="" width="44" height="44" class="d-inline-block align-top" />
                        </a>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Movies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">TV Shows</a>
                            </li>
                            <li class="nav-item-search">
                                <a class="nav-link" href="#">
                                    <SearchRoundedIcon />
                                </a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavbarHeader;