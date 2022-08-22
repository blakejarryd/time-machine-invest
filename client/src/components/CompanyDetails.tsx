import { FC, useState, useEffect } from 'react'
import { Share } from '../models/models'
import { useParams } from "react-router-dom";
import SharePrices from './SharePrices';
import { Card, CardHeader, CardContent, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CompanyDetailsProps {
  ticker: string
}

const CompanyDetails = ({ ticker }: CompanyDetailsProps) => {
  const [share, setShare] = useState<Share>({})

  const fetchShareInfo: Function = () => {
    fetch(`http://127.0.0.1:4999/shares/${ticker}`)
    .then(response => response.json())
    .then(share => setShare(share[0]))  
  }

  useEffect(() => {
    fetchShareInfo()
  }, [ticker])
 
  return (
      <Card elevation={3}>
        <CardHeader title={share.Name} />
        <CardContent>
        <Typography>Company Information</Typography>
        <Accordion>
        <AccordionSummary
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
        </CardContent>
        <SharePrices ticker={ticker}/>
      </Card>
  )
}

export default CompanyDetails