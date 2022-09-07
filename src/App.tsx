import React from 'react';
import 'index.scss';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import Chart from "./views/Chart";
import NoMatch from "./views/Nomatch";
import Count from "./views/Count";
import Statistics from "./views/Statistics";
import PayTagsSettings from "./views/PayTagsSettings";
import {PayTagEdit} from "./views/PayTagEdit";
import {IncomeTagsSettings} from "./views/IncomeTagSettings";
import {IncomeTagEdit} from "./views/IncomeTagEdit";
import {AddTag} from "./views/AddTag";
import {RecordsEdit} from "./views/RecordsEdit";
export default function App() {
    return (
    <HashRouter>
                <Routes>
                    <Route index element={<Count />}/>
                    <Route path="chart" element={<Chart />}/>
                    <Route path="count" element={<Count />}/>
                    <Route path="statistics" element={<Statistics />}/>
                    <Route path="payTagsSettings" element={<PayTagsSettings />}/>
                    <Route path="incomeTagsSettings" element={<IncomeTagsSettings />}/>
                    <Route path="payTagsSettings/:id" element={<PayTagEdit />}/>
                    <Route path="incomeTagsSettings/:id" element={<IncomeTagEdit />}/>
                    <Route path="recordsEdit/:id" element={<RecordsEdit />}/>
                    <Route path="AddTag" element={<AddTag />}/>
                    <Route path="*" element={<NoMatch />}/>
                </Routes>
    </HashRouter>
    );
};
