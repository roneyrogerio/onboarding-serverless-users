const PERSON = [
  { id: 1, name: 'Maria', 'birth-date': '01-01-1910', city: 'Santa Rita do Passa Quatro' },
  { id: 2, name: 'João', 'birth-date': '02-01-1920', city: 'Xique-Xique' },
  { id: 3, name: 'Antônio', 'birth-date': '03-01-1930', city: 'Passa e Fica' },
];

function getPersonList(): Array<{ id: number, name: string }> {
  return PERSON;
}

function getPersonById(id: number): { id: number, name: string } | undefined {
  return PERSON.find((person) => person.id === id);
}

export {
  getPersonList,
  getPersonById,
};
