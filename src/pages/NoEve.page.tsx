import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { greenLight, greyLight, white } from '../constants/colors';
import StepperNoEveComponent from '../components/StepperNoEve.component';

function NoEvePage() {
    const [aliceArray, setAliceArray] = useState<number[]>([]);
  const [bobsArray, setBobsArray] = useState<number[]>([]);
  const [xGate, setXGate] = useState<number[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [step, setStep] = useState(0);

  const [size, setSize] = useState(50);

  const generateArrays = (size: number) => {
    setButtonClicked(false);
    if(size >= 10 && size <= 150){
      const array1: number[] = [];//Alices array
      const array2: number[] = [];//Bobs array
      const array3: number[] = [];//Eves array
      for(let i = 0; i < size; i++){
        // Generating random 0s and 1s for each array
        array1.push(Math.floor(Math.random() * 2));
        array2.push(Math.floor(Math.random() * 2));
        array3.push(Math.floor(Math.random() * 2));
      }

      setAliceArray(array1);
      setBobsArray(array2);
      setXGate(array3);

      setButtonClicked(true);
    }
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
        <Grid item xs={2.5}>
          <TextField error={size < 10 || size > 150} helperText={ size < 10 || size > 150 ? "Size must be between 10 and 150" : ""} InputProps={{ inputProps: { min: 10, max: 150, step: 5, style: { textAlign: "center" } } }} label="Classical bit size" sx={{width: "100%"}} type="number" defaultValue={50} onChange={(e) => setSize(Number(e.target.value))} />
        </Grid>
        <Grid item xs={1.5} textAlign="center" alignItems="center" alignContent="center" alignSelf="top-center">
          <Button sx={{width: "100%", height:50}} variant='contained' onClick={() => generateArrays(size)}>Generate</Button>
        </Grid>
        <Grid item xs={4}></Grid>

        {buttonClicked && <>

        <Grid item xs={12} sx={{marginTop: 5}}>
          <StepperNoEveComponent step={step} setStep={setStep} />
        </Grid>

        <Grid item xs={12} textAlign="center" marginRight={20} marginLeft={20}>
          <Typography color={step === 0 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(0)}>Random classical bits are generated.</Typography>
          <Typography color={step === 1 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(1)}>Alice randomly applies X gate on random classical bits.</Typography>
          <Typography color={step === 2 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(2)}>Result of bits from X gate and also bits which were not passed through X gate is polarized.</Typography>
          <Typography color={step === 3 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(3)}>Bob randomly applies H gate on the result received from Alice.</Typography>
          <Typography color={step === 4 ? white : greyLight} sx={{cursor: "pointer"}} onClick={() => setStep(4)}>Alice sends her classical bits which control the H gate to Bob. Bob compares the bits sent by Alice with his own classical bits which also control his H gate. Bob discards the rows wherever Alice's classical bits and his classical bits are not the same and tells Alice whether the row should be discarded or not everytime. Result is used as a shared key.</Typography>
        </Grid>

        <Grid item xs={12} textAlign="center" sx={{marginTop: 5}}>
          {step > 3 && <b style={{color: greenLight}}>Shared key:</b>}&nbsp;
        {bobsArray.map((e, i) => {
          return (step > 3 && (e === aliceArray[i] ? polarizateBob(aliceArray[i], xGate[i], e).replace("|", "").replace(">", "") : ""));
        })}
        </Grid>
        <Grid item xs={5.25}>
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
                        {step > 0 && <TableCell align='right'>{xGate[i] === 0 ? "NO" : "YES"}</TableCell>}
                        {step > 1 && <TableCell align='right'>{polarizateAlice(e, xGate[i])}</TableCell>}
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
                    <TableCell style={{color: greenLight, fontWeight: "bold"}} align='center'>Discarded?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bobsArray.map((e, i) => {

                    return (
                      <TableRow key={i}>
                        {step > 3 && <TableCell align='center'>{(e === aliceArray[i] ? <CloseIcon sx={{fontSize: 12}} /> : <CheckIcon sx={{fontSize: 12}} />)}</TableCell>}
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
                        {step > 2 && <TableCell>{(e === 0 ? "NO" : "YES")}</TableCell>}
                        {step > 2 && <TableCell>{(polarizateBob(aliceArray[i], xGate[i], e))}</TableCell>}
                        {step > 3 && <TableCell>{(e === aliceArray[i] ? polarizateBob(aliceArray[i], xGate[i], e).replace("|", "").replace(">", "") : "")}</TableCell>}
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

export default NoEvePage;