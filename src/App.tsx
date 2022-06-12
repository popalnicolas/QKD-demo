import './App.css';
import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function App() {
  
  const [aliceArray, setAliceArray] = useState<number[]>([]);
  const [bobsArray, setBobsArray] = useState<number[]>([]);
  const [xGate, setXGate] = useState<number[]>([]);

  const [size, setSize] = useState(50);

  const generateArrays = (size: number) => {
    const array1: number[] = [];
    const array2: number[] = [];
    const array3: number[] = [];
    for(let i = 0; i< size; i++){
      array1.push(Math.floor(Math.random() * 2));
      array2.push(Math.floor(Math.random() * 2));
      array3.push(Math.floor(Math.random() * 2));
    }

    setAliceArray(array1);
    setBobsArray(array2);
    setXGate(array3);
  }

  const polarizateAlice = (a: number, b: number) => {
    if(a === 0 && b === 0)
      return "|0>";
    else if(a === 0 && b === 1)
      return "|+>";
    else if(a === 1 && b === 0)
      return "|1>";
    else
      return "|->";
  }

  const polarizateBob = (a: number, b: number, c: number) => {
    if(a === 0 && b === 0){
      if(c === 0)
        return "|0>";
      else
        return "|+>";
    }
    else if(a === 0 && b === 1){
      if(c === 0)
        return "|1>";
      else
        return "|->";
    }
    else if(a === 1 && b === 0){
      if(c === 0)
        return "|+>";
      else
        return "|0>";
    }
    else{
      if(c === 0)
        return "|->";
      else
        return "|1>";
    }
  }

  return (
    <Container sx={{paddingTop: 20, paddingBottom: 20}}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <TextField label="Classical bit size" sx={{width: "100%"}} type="number" defaultValue={50} onChange={(e) => setSize(Number(e.target.value))} />
        </Grid>
        <Grid item xs={2} textAlign="center" alignItems="center" alignContent="center" alignSelf="center">
          <Button sx={{width: "100%", height:"100%"}} variant='contained' onClick={() => generateArrays(size)}>Generate</Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={12} textAlign="center" sx={{marginTop: 10}}>
          Shared key:&nbsp;
        {bobsArray.map((e, i) => {
          return (e === aliceArray[i] ? polarizateBob(aliceArray[i], xGate[i], e).replace("|", "").replace(">", "") : "");
        })}
        </Grid>
        <Grid item xs={5.25}>
          <Grid container sx={{paddingTop: 10}}>
            <Grid item xs={12} display="flex" justifyContent="right" alignItems="right">
              <Avatar alt='Alice' src={process.env.PUBLIC_URL +'/images/alice.jpeg'} sx={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Typography>Random classical bits: </Typography>
              <Typography noWrap>{ aliceArray }</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Bit (b)</TableCell>
                    <TableCell align='right'>X Gate Applied? (a)</TableCell>
                    <TableCell align='right'>After Polarization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aliceArray.map((e, i) => {

                    return (
                      <TableRow>
                        <TableCell align='right'>{e}</TableCell>
                        <TableCell align='right'>{xGate[i] === 0 ? "NO" : "YES"}</TableCell>
                        <TableCell align='right'>{polarizateAlice(e, xGate[i])}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.5}>
          <Grid container sx={{paddingTop: 28.5}}>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Discarded?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bobsArray.map((e, i) => {

                    return (
                      <TableRow>
                        <TableCell align='center'>{e === aliceArray[i] ? <CloseIcon sx={{fontSize: 12}} /> : <CheckIcon sx={{fontSize: 12}} />}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5.25}>
          <Grid container sx={{paddingTop: 10}}>
            <Grid item xs={12}>
            <Avatar alt='Alice' src={process.env.PUBLIC_URL +'/images/bob.jpeg'} sx={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={12}>
              <Typography>Random classical bits: </Typography>
              <Typography noWrap>{ bobsArray }</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>H gate Applied? (b')</TableCell>
                    <TableCell>Result of measurement (a')</TableCell>
                    <TableCell>Shared Key</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bobsArray.map((e, i) => {

                    return (
                      <TableRow>
                        <TableCell>{e === 0 ? "NO" : "YES"}</TableCell>
                        <TableCell>{polarizateBob(aliceArray[i], xGate[i], e)}</TableCell>
                        <TableCell>{e === aliceArray[i] ? polarizateBob(aliceArray[i], xGate[i], e).replace("|", "").replace(">", "") : ""}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
