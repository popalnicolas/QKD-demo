import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { greenLight, greyLight, white } from '../constants/colors';
import StepperEveComponent from '../components/StepperEve.component';

function EvePage() {
  const [aliceArray, setAliceArray] = useState<number[]>([]);
  const [bobsArray, setBobsArray] = useState<number[]>([]);
  const [evesArray, setEvesArray] = useState<number[]>([]);
  const [xGate, setXGate] = useState<number[]>([]);

  const [detected, setDetected] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);

  const [step, setStep] = useState(0);

  const [size, setSize] = useState(50);

  const generateArrays = (size: number) => {
    setButtonClicked(false);
    if(size >= 5 && size <= 150){

      setDetected(false);

      const array1: number[] = [];
      const array2: number[] = [];
      const array3: number[] = [];
      const array4: number[] = [];
      for(let i = 0; i< size; i++){
        array1.push(Math.floor(Math.random() * 2));
        array2.push(Math.floor(Math.random() * 2));
        array3.push(Math.floor(Math.random() * 2));
        array4.push(Math.floor(Math.random() * 2));
      }

      setAliceArray(array1);
      setBobsArray(array2);
      setEvesArray(array3);
      setXGate(array4);

      setButtonClicked(true);

      array2.map((e, i) => {
          const bobsResult = polarizateBob(array1[i], array4[i], array3[i], e).replace("|", "").replace(">", "");     
          
          console.log(bobsResult);

          if(!isNaN(Number(bobsResult))){
            if(e !== array1[i]){
              setDetected(true);
            }
          }
      });
    }
  }

  const polarizateAlice = (a: number, b: number) => {
    if(a === 0 && b === 0)
      return 0;//"|0>"
    else if(a === 0 && b === 1)
      return 1;//"|+>";
    else if(a === 1 && b === 0)
      return 2;//"|1>";
    else
      return 3;//"|->";
  }

  const numberToPhoton = (n: number) => {
    switch(n){
      case 0:
        return "|0>";
      case 1:
        return "|+>";
      case 2:
        return "|1>";
      case 3:
        return "|->";
    }
  }

  const polarizateEve = (a: number, b: number, c: number) => {
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

  const polarizateBob = (b: number, a: number, c: number, d: number) => {
    if(a === 0 && b === 0){
      if(c === 0){
        if(d === 0)// 0 0 0 0
          return "|0>";
        else// 0 0 0 1
          return "|+>";
      }
      else{
        if(d === 0)// 0 0 1 0
          return "|+>";
        else// 0 0 1 1
          return "|0>";
      }
    }
    else if(a === 0 && b === 1){
      if(c === 0){
        if(d === 0)// 0 1 0 0
          return "|+>";
        else// 0 1 0 1
          return "|0>";
      }
      else{
        if(d === 0)// 0 1 1 0
          return "|+>";
        else// 0 1 1 1
          return "|+>";
      }
    }
    else if(a === 1 && b === 0){
      if(c === 0){
        if(d === 0)// 1 0 0 0
          return "|1>";
        else// 1 0 0 1
          return "|->";
      }
      else{
        if(d === 0)// 1 0 1 0
          return "|->";
        else// 1 0 1 1
          return "|1>";
      }
    }
    else{
      if(c === 0){
        if(d === 0)// 1 1 0 0
          return "|->";
        else// 1 1 0 1
          return "|1>";
      }
      else{
        if(d === 0)// 1 1 1 0
          return "|1>";
        else// 1 1 1 1
          return "|1>";
      }
    }
  }

  return (
    <Container sx={{paddingTop: 20, paddingBottom: 20}}>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={2.5}>
          <TextField error={size < 5 || size > 150} helperText={ size < 5 || size > 150 ? "Size must be between 5 and 150" : ""} InputProps={{ inputProps: { min: 5, max: 150, step: 5, style: { textAlign: "center" } } }} label="Classical bit size" sx={{width: "100%"}} type="number" defaultValue={50} onChange={(e) => setSize(Number(e.target.value))} />
        </Grid>
        <Grid item xs={1.5} textAlign="center" alignItems="center" alignContent="center" alignSelf="top-center">
          <Button sx={{width: "100%", height:50}} variant='contained' onClick={() => generateArrays(size)}>Generate</Button>
        </Grid>
        <Grid item xs={4}></Grid>

        {buttonClicked && <>

        <Grid item xs={12} sx={{marginTop: 5}}>
          <StepperEveComponent step={step} setStep={setStep} />
        </Grid>

        <Grid item xs={12} textAlign="center" marginRight={20} marginLeft={20}>
          <Typography color={step === 0 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(0)}>Random classical bits are generated.</Typography>
          <Typography color={step === 1 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(1)}>Alice randomly applies X gate on random classical bits.</Typography>
          <Typography color={step === 2 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(2)}>Result of bits from X gate and also bits which were not passed through X gate is polarized.</Typography>
          <Typography color={step === 3 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(3)}>Eavesdropper Eve is getting photons from Alice and randomly applies H gate. This actions changes photons polarization, which is send to Bob.</Typography>
          <Typography color={step === 4 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(4)}>Bob randomly applies H gate on the result received from Alice.</Typography>
          <Typography color={step === 5 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(5)}>Alice sends her classical bits which control the H gate to Bob. Bob compares the bits sent by Alice with his own classical bits which also control his H gate. Bob discards the rows wherever Alice's classical bits and his classical bits are not the same and tells Alice whether the row should be discarded or not everytime. Result is used as a shared key.</Typography>
        </Grid>

        <Grid item xs={12} textAlign="center" sx={{marginTop: 5}}>
          {step > 4 && (detected ? <Typography color="#F94C66">EVESDROPPER DETECTED</Typography> : <Typography color="#5FD068">EVESDROPPER UNDETECTED</Typography>)}&nbsp;
        </Grid>
        <Grid item xs={4}>
          <Grid container sx={{paddingTop: 10}}>
            <Grid item xs={12} display="flex" justifyContent="right" alignItems="right">
              <Avatar alt='Alice' src={process.env.PUBLIC_URL +'/images/alice.jpeg'} sx={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Typography style={{color: greenLight}} fontWeight="bold">Random classical bits: </Typography>
              <Tooltip title={ aliceArray }>
                <Typography noWrap>{ aliceArray }</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='right'>Bit (b)</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='right'>X Gate Applied? (a)</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='right'>After Polarization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aliceArray.map((e, i) => {

                    return (
                      <TableRow key={i}>
                        <TableCell align='right'>{e}</TableCell>
                        <TableCell align='right'>{step > 0 && (xGate[i] === 0 ? "NO" : "YES")}</TableCell>
                        <TableCell align='right'>{step > 1 && numberToPhoton((polarizateAlice(e, xGate[i])))}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={4}>
          <Grid container sx={{paddingTop: 10}}>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <Avatar alt='Eve' src={process.env.PUBLIC_URL +'/images/eve.jpeg'} sx={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography style={{color: greenLight}} fontWeight="bold">Random classical bits: </Typography>
              <Tooltip title={ evesArray }>
                <Typography noWrap>{ evesArray }</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sx={{paddingTop: 3}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='center'>Bit</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='center'>H Gate Applied?</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='center'>After Polarization</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evesArray.map((e, i) => {

                    return (
                      <TableRow key={i}>
                        <TableCell align='center'>{step > 2 && e}</TableCell>
                        <TableCell align='center'>{step > 2 && (e === 0 ? "NO" : "YES")}</TableCell>
                        <TableCell align='center'>{step > 2 && polarizateEve(aliceArray[i], xGate[i], e)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={4}>
          <Grid container sx={{paddingTop: 10}}>
            <Grid item xs={12}>
            <Avatar alt='Bob' src={process.env.PUBLIC_URL +'/images/bob.jpeg'} sx={{width: 100, height: 100}} />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{color: greenLight}} fontWeight="bold">Random classical bits: </Typography>
              <Tooltip title={ bobsArray }>
                <Typography noWrap>{ bobsArray }</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}}>H gate Applied? (b')</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}}>Result of measurement (a')</TableCell>
                    <TableCell style={{color: greenLight, fontWeight: "bold"}}>Shared Key</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bobsArray.map((e, i) => {

                    return (
                      <TableRow key={i}>
                        <TableCell>{step > 3 && (e === 0 ? "NO" : "YES")}</TableCell>
                        <TableCell>{step > 3 && (polarizateBob(aliceArray[i], xGate[i], evesArray[i], e))}</TableCell>
                        <TableCell>{step > 4 && (polarizateBob(aliceArray[i], xGate[i], evesArray[i], e).replace("|", "").replace(">", "").replace("+", "").replace("-", ""))}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid></>}
      </Grid>
    </Container>
  );
}

export default EvePage;