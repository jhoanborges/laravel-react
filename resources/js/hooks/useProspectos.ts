import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  AddressData,
  BuroRecord,
  ContactTableItem,
  ExternalEntitiesState,
  FisicaState,
  HRFormData,
  HRRecord,
  InfonavitRecord,
  MoralState,
  PersonalInfoState,
  addBuroRecord,
  addContactToTable,
  addHRRecord,
  addInfonavitRecord,
  clearHRFormData,
  copyFiscalToCorrespondencia,
  deleteBuroRecord,
  deleteContactFromTable,
  deleteHRRecord,
  deleteInfonavitRecord,
  resetForm,
  setActiveTab,
  setHRModalOpen,
  setPersonType,
  setSearchOpen,
  setSelectedProspect,
  updateBanxico,
  updateBuroRecord,
  updateCNBV,
  updateContact,
  updateContactInTable,
  updateCorrespondenciaAddress,
  updateFisica,
  updateFiscalAddress,
  updateHRFormData,
  updateInfonavit,
  updateInfonavitRecord,
  updateMoral,
  updateNafinsa,
  updatePersonalInfo,
} from '@/redux/slices'

// ===== UI Hooks =====

export const useActiveTab = () => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.prospectos.ui.activeTab)

  return {
    activeTab,
    setActiveTab: (tab: string) => dispatch(setActiveTab(tab)),
  }
}

export const useSearchForm = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.prospectos.ui.searchOpen)
  const selectedProspect = useAppSelector((state) => state.prospectos.form.selectedProspect)

  return {
    open,
    selectedProspect,
    setOpen: (isOpen: boolean) => dispatch(setSearchOpen(isOpen)),
    setSelectedProspect: (prospect: string) => dispatch(setSelectedProspect(prospect)),
  }
}

// ===== Form Section Hooks =====

export const usePersonType = () => {
  const dispatch = useAppDispatch()
  const personType = useAppSelector((state) => state.prospectos.form.personType)

  return {
    personType,
    setPersonType: (type: 'moral' | 'fisica') => dispatch(setPersonType(type)),
  }
}

export const usePersonalInfo = () => {
  const dispatch = useAppDispatch()
  const personalInfo = useAppSelector((state) => state.prospectos.form.personalInfo)

  return {
    personalInfo,
    updatePersonalInfo: (data: Partial<PersonalInfoState>) => dispatch(updatePersonalInfo(data)),
  }
}

export const useFisicaData = () => {
  const dispatch = useAppDispatch()
  const fisica = useAppSelector((state) => state.prospectos.form.fisica)

  return {
    fisica,
    updateFisica: (data: Partial<FisicaState>) => dispatch(updateFisica(data)),
  }
}

export const useMoralData = () => {
  const dispatch = useAppDispatch()
  const moral = useAppSelector((state) => state.prospectos.form.moral)

  return {
    moral,
    updateMoral: (data: Partial<MoralState>) => dispatch(updateMoral(data)),
  }
}

export const useContactData = () => {
  const dispatch = useAppDispatch()
  const contact = useAppSelector((state) => state.prospectos.form.contact)

  return {
    contact,
    updateContact: (data: Partial<typeof contact>) => dispatch(updateContact(data)),
  }
}

export const useAddressData = () => {
  const dispatch = useAppDispatch()
  const fiscal = useAppSelector((state) => state.prospectos.form.address.fiscal)
  const correspondencia = useAppSelector((state) => state.prospectos.form.address.correspondencia)

  return {
    fiscal,
    correspondencia,
    updateFiscal: (data: Partial<AddressData>) => dispatch(updateFiscalAddress(data)),
    updateCorrespondencia: (data: Partial<AddressData>) => dispatch(updateCorrespondenciaAddress(data)),
    copyToCorrespondencia: () => dispatch(copyFiscalToCorrespondencia()),
  }
}

// ===== Table/Array Hooks =====

export const useContactsTable = () => {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector((state) => state.prospectos.form.contactsTable)

  return {
    contacts,
    addContact: (contact: ContactTableItem) => dispatch(addContactToTable(contact)),
    updateContact: (contact: ContactTableItem) => dispatch(updateContactInTable(contact)),
    deleteContact: (id: string) => dispatch(deleteContactFromTable(id)),
  }
}

export const useHRSection = () => {
  const dispatch = useAppDispatch()
  const records = useAppSelector((state) => state.prospectos.form.hr.records)
  const modalOpen = useAppSelector((state) => state.prospectos.form.hr.modalOpen)
  const formData = useAppSelector((state) => state.prospectos.form.hr.formData)

  return {
    records,
    modalOpen,
    formData,
    setModalOpen: (isOpen: boolean) => dispatch(setHRModalOpen(isOpen)),
    updateFormData: (data: Partial<HRFormData>) => dispatch(updateHRFormData(data)),
    addRecord: (record: HRRecord) => dispatch(addHRRecord(record)),
    deleteRecord: (id: string) => dispatch(deleteHRRecord(id)),
    clearFormData: () => dispatch(clearHRFormData()),
  }
}

export const useExternalEntities = () => {
  const dispatch = useAppDispatch()
  const entities = useAppSelector((state) => state.prospectos.form.externalEntities)

  return {
    nafinsa: entities.nafinsa,
    cnbv: entities.cnbv,
    banxico: entities.banxico,
    infonavit: entities.infonavit,
    buroCreditos: entities.buroCreditos,
    infonavitRecords: entities.infonavitRecords,

    // Nafinsa
    updateNafinsa: (data: Partial<ExternalEntitiesState['nafinsa']>) => dispatch(updateNafinsa(data)),

    // CNBV
    updateCNBV: (data: Partial<ExternalEntitiesState['cnbv']>) => dispatch(updateCNBV(data)),

    // Banxico
    updateBanxico: (data: Partial<ExternalEntitiesState['banxico']>) => dispatch(updateBanxico(data)),

    // Infonavit
    updateInfonavit: (data: Partial<ExternalEntitiesState['infonavit']>) => dispatch(updateInfonavit(data)),

    // Buro Creditos CRUD
    addBuroRecord: (record: BuroRecord) => dispatch(addBuroRecord(record)),
    updateBuroRecord: (record: BuroRecord) => dispatch(updateBuroRecord(record)),
    deleteBuroRecord: (id: string) => dispatch(deleteBuroRecord(id)),

    // Infonavit Records CRUD
    addInfonavitRecord: (record: InfonavitRecord) => dispatch(addInfonavitRecord(record)),
    updateInfonavitRecord: (record: InfonavitRecord) => dispatch(updateInfonavitRecord(record)),
    deleteInfonavitRecord: (id: string) => dispatch(deleteInfonavitRecord(id)),
  }
}

// ===== Utility Hook =====

export const useProspectosForm = () => {
  const dispatch = useAppDispatch()

  return {
    resetForm: () => dispatch(resetForm()),
  }
}
