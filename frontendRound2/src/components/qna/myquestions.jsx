import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { ThemeContextConsumer } from '../../context/themer';
import { Container } from '@material-ui/core';
import {Link} from '@material-ui/icons';
import MaterialTable from 'material-table';
import { getCookie } from '../../functions/cookiefns';

export default function MyQuestions(){

    const dummy = null;
    const [myQs, setMyQs] = useState([]);

    const fetchQuestions = () => {
        const cookie = getCookie("usertoken");
        axios({
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${cookie}`
            },
            url: "/api/myqna",
        })
        .then((response) => {
            console.log(response.data);
            //setMyQs(response.data.questions);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => { 
        if(getCookie("usertoken") !== '');
            fetchQuestions();
    }, [dummy]);

    return(
        getCookie("usertoken") !== '' ? 
        <ThemeContextConsumer>
            {(themeContext) => (
                <div style = {{
                    minHeight: "100vh",
                    backgroundColor: themeContext.dark ? '#212121' : "white",
                    color: themeContext.dark ? 'white' : 'black',
                }}>
                    <Container style = {{paddingTop: "8vh"}}>
                        <h1 style = {{fontWeight: 300}}>QnA history</h1>
                        <MaterialTable
                            style = {{
                                backgroundColor: themeContext.dark ? '#424242' : "white",
                                color: themeContext.dark ? 'white' : 'black',
                            }}
                            options={{
                                exportButton: true,
                                sorting: true,
                                headerStyle: {
                                    backgroundColor: themeContext.dark ? '#424242' : "white",
                                    color: themeContext.dark ? 'white' : 'black',
                                },
                                rowStyle: {
                                    backgroundColor: themeContext.dark ? '#535353' : "white"
                                },
                                searchFieldAlignment: 'left',
                                searchFieldStyle: {
                                    color: themeContext.dark ? 'white' : 'black',
                                },
                                showTitle: false
                            }}
                            columns={[
                                { title: 'Title', field: 'title' },
                                { title: 'Questions',field: 'questions'},
                                { title: 'Answers', field: 'answers'}
                            ]}
                            data={myQs}
                        />
                    </Container>
                </div>
            )}
        </ThemeContextConsumer>
        :
        <Redirect to = '/'/>
    )
}