import React from "react";
import classnames from 'classnames';
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('icon', true, /\.svg$/));} catch (error) {console.log(error);}

type Props = {
    name : string;
}&React.SVGAttributes<SVGElement>
const Icon = (props : Props) => {
    const {name,children,className,...rest} = props
    return(
    <svg className={classnames('icon', className)} {...rest}>
        <use xlinkHref = {'#' + props.name}></use>
    </svg>
    );
};

export  default  Icon;