import React from "react";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Summary from '../pages/Summary';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Home1 from "../pages/Homeold";
import Laboratory from "../pages/Laboratory";


export interface IRoute {
    path: string;
    element: React.FC;
}

export enum Params {

}

export enum RouteNames {
    HOME = '/',
    LOGIN = '/login',
    FILE = '/file',
    SUMMARY = '/summary',
    DASHBOARD = '/dashboard',
    DASHBOARD_ITEM = '/dashboard/:plant_id',
    USER = '/user',
    LABORATORY = '/laboratory',
    NO_MATCH = '*'

}

export enum RouteParams {
    DASHBOARD_PARAMETER = 'plant_id'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.HOME, element: Home},
    {path: RouteNames.FILE, element: Upload},
    {path: RouteNames.SUMMARY, element: Summary},
    {path: RouteNames.DASHBOARD_ITEM, element: Dashboard},
    {path: RouteNames.USER, element: Home1},
    {path: RouteNames.LABORATORY, element: Laboratory},
    {path: RouteNames.NO_MATCH, element: NotFound},

]