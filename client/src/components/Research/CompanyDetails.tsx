import { useState, useEffect } from 'react'
import { Share } from '../../models/models'
import SharePrices from './SharePrices';
import { Card, CardHeader, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NumberFormat from 'react-number-format';

interface CompanyDetailsProps {
  ticker: string
}

const CompanyDetails = ({ ticker }: CompanyDetailsProps) => {
  const [share, setShare] = useState<Share>({})

  const fetchShareInfo: Function = () => {
    let loader = document.querySelector<HTMLElement>(".loader")
    let graph = document.querySelector<HTMLElement>(".graph")
    loader!.style.display = 'block'
    graph!.style.display = 'none'
    fetch(`/shares/${ticker}`)
    .then(response => response.json())
    .then(share => setShare(share[0]))  
  }

  useEffect(() => {
    fetchShareInfo()
  }, [ticker])
 
  return (
    <Card elevation={3} className='CompanyDetails'>
      <CardHeader 
        title={share.Name} 
        action={<img src={share.LogoUrl}></img>}
        >
      </CardHeader>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Summary
        </Typography>
        <Typography>Sector: {share.Sector}</Typography>
        <Typography>Industry: {share.Industry}</Typography>
        <Typography>Employees: {share.Employees}</Typography>
        <Typography>Website: <a href={share.Website} target="_blank">{share.Website}</a></Typography>
        <Accordion elevation={0} >
          <AccordionSummary 
            sx={{pl:0 , width: '30%'}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Company Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{share.Summary}</Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Typography sx={{ mt: 2, fontSize: 16 }} color="text.secondary" gutterBottom>
          Financials
        </Typography>
        <Typography>Market Cap: <NumberFormat value={share.MarketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} fixedDecimalScale={true}/></Typography>
        <Typography>Dividend Yield: <NumberFormat value={share.DividendYield} displayType={'text'}  format={v => Number(v)/100 + "%"} thousandSeparator={true} decimalScale={4} fixedDecimalScale={true}/></Typography>
        <SharePrices ticker={ticker}/>
      </CardContent>
    </Card>
  )
}

export default CompanyDetails