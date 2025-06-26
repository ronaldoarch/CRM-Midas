export function saveUser(data: any) {
  if (!data.user_id || !data.name || !data.email) {
    console.error('Payload de usuário inválido:', data)
    return
  }
  // Aqui você pode inserir no banco de dados
  console.log('Usuário salvo/atualizado:', data)
}

export function saveDeposit(data: any) {
  if (!data.user_id || !data.amount || !data.deposit_at) {
    console.error('Payload de depósito inválido:', data)
    return
  }
  // Aqui você pode inserir no banco de dados
  console.log('Depósito salvo:', data)
}

export function saveWithdrawal(data: any) {
  if (!data.user_id || !data.amount || !data.withdrawal_at) {
    console.error('Payload de saque inválido:', data)
    return
  }
  // Aqui você pode inserir no banco de dados
  console.log('Saque salvo:', data)
}

export function saveBet(data: any) {
  if (!data.user_id || !data.bet_id || !data.amount) {
    console.error('Payload de aposta inválido:', data)
    return
  }
  // Aqui você pode inserir no banco de dados
  console.log('Aposta salva:', data)
} 