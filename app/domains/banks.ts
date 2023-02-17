import { makeDomainFunction } from "domain-functions"
import { z } from "zod"

export const schema = z.object({
  bankCode: z.string().min(1, 'Minimo de 1 caractere para busca'),
})

export const getBankInfo = makeDomainFunction(schema)(async ({bankCode}) => {
  const banksList = await fetch(`https://brasilapi.com.br/api/banks/v1/${bankCode}`).then(res => res.json())
  return {banksList}
})