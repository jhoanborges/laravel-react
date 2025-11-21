import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ===== Type Definitions =====

export interface PersonalInfoState {
    fiscalPersonality: string;
    riskType: string;
    rfc: string;
    rfcValidated: boolean;
    activity: string;
    origin: string;
    politicallyExposed: string;
}

export interface FisicaState {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    estadoCivil: string;
    dependientes: string;
    sexo: string;
    nacionalidad: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    requiereCurp: boolean;
    curp: string;
    fechaNacimiento: string;
    lugar: string;
    nombreCompletoFiscal: string;
    paisNacimiento: string;
    entidadFederativaNacimiento: string;
}

export interface MoralState {
    socialReason: string;
    societyType: string;
    registrationNumber: string;
    registrationDate: string;
    registrationPlaza: string;
    notaryName: string;
    nationality: string;
    rfcInscription: string;
    rfcInscriptionDate: string;
    rfcInscriptionPlaza: string;
    notaryNumber: string;
    constitutionDate: string;
    socialReasonFiscal: string;
}

export interface ContactState {
    requiresElectronicSignature: boolean;
    email: string;
    invoiceEmail: string;
    phone1Type: string;
    phone1: string;
    phone2Type: string;
    phone2: string;
    phone3Type: string;
    phone3: string;
    phone4Type: string;
    phone4: string;
    paisNacimiento: string;
    entidadFederativaNacimiento: string;
}

export interface AddressData {
    domicilio: string;
    codigoPostal: string;
    pais: string;
    estado: string;
    municipio: string;
    ciudad: string;
    colonia: string;
    coloniaNoEncontrada: boolean;
    entreCalles: string;
    numExterior: string;
    numInterior: string;
}

export interface AddressState {
    fiscal: AddressData;
    correspondencia: AddressData;
}

export interface ContactTableItem {
    id: string;
    numero: string;
    contacto: string;
    puesto: string;
    telefono: string;
    tipo: string;
    correoElectronico: string;
}

export interface HRRecord {
    id: string;
    periodo: string;
    inicioDependent: string;
    inicioNoDependent: string;
    finDependent: string;
    finNoDependent: string;
}

export interface HRFormData {
    cliente: string;
    consecutivo: string;
    periodo: string;
    inicioDependent: string;
    inicioNoDependent: string;
    finDependent: string;
    finNoDependent: string;
}

export interface HRState {
    records: HRRecord[];
    modalOpen: boolean;
    formData: HRFormData;
}

export interface BuroRecord {
    id: string;
    no: string;
    fechaConsultaBuro: string;
    folioConsultaBuro: string;
    claveConsultaBuro: string;
    fechaCaptura: string;
    usuarioCaptura: string;
    maquinaCaptura: string;
    saldo: string;
    score: string;
    vencida: string;
    carteraVencida: string;
}

export interface InfonavitRecord {
    id: string;
    periodo: string;
    pagoInfonavit: string;
    diasAtraso: string;
}

export interface ExternalEntitiesState {
    nafinsa: {
        stratoEmpresa: string;
        sector: string;
    };
    buroCreditos: BuroRecord[];
    cnbv: {
        tipoClienteRelacionado: string;
        personalidadJuridica: string;
        esFondo: string;
    };
    banxico: {
        sectorEconomico: string;
    };
    infonavit: {
        afiliacion: string;
        credito: string;
    };
    infonavitRecords: InfonavitRecord[];
}

export interface ProspectosState {
    ui: {
        activeTab: string;
        searchOpen: boolean;
    };
    form: {
        personType: 'moral' | 'fisica';
        selectedProspect: string;
        personalInfo: PersonalInfoState;
        fisica: FisicaState;
        moral: MoralState;
        contact: ContactState;
        address: AddressState;
        contactsTable: ContactTableItem[];
        hr: HRState;
        externalEntities: ExternalEntitiesState;
    };
}

// ===== Initial State =====

const initialAddressData: AddressData = {
    domicilio: '',
    codigoPostal: '',
    pais: '',
    estado: '',
    municipio: '',
    ciudad: '',
    colonia: '',
    coloniaNoEncontrada: false,
    entreCalles: '',
    numExterior: '',
    numInterior: '',
};

const initialState: ProspectosState = {
    ui: {
        activeTab: 'prospect',
        searchOpen: false,
    },
    form: {
        personType: 'moral',
        selectedProspect: 'solicines',
        personalInfo: {
            fiscalPersonality: 'persona-moral',
            riskType: 'bajo',
            rfc: 'SMT-410317-A',
            rfcValidated: false,
            activity: '',
            origin: 'oficinas-value-arrendadora',
            politicallyExposed: '',
        },
        fisica: {
            nombre: '',
            apPaterno: '',
            apMaterno: '',
            estadoCivil: '',
            dependientes: '',
            sexo: '',
            nacionalidad: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
            requiereCurp: true,
            curp: '',
            fechaNacimiento: '',
            lugar: '',
            nombreCompletoFiscal: '',
            paisNacimiento: '',
            entidadFederativaNacimiento: '',
        },
        moral: {
            socialReason: '',
            societyType: '',
            registrationNumber: '',
            registrationDate: '',
            registrationPlaza: '',
            notaryName: '',
            nationality: '',
            rfcInscription: '',
            rfcInscriptionDate: '',
            rfcInscriptionPlaza: '',
            notaryNumber: '',
            constitutionDate: '',
            socialReasonFiscal: '',
        },
        contact: {
            requiresElectronicSignature: false,
            email: '',
            invoiceEmail: '',
            phone1Type: 'oficina',
            phone1: '',
            phone2Type: 'casa',
            phone2: '',
            phone3Type: 'fax',
            phone3: '',
            phone4Type: 'celular',
            phone4: '',
            paisNacimiento: '',
            entidadFederativaNacimiento: '',
        },
        address: {
            fiscal: { ...initialAddressData },
            correspondencia: { ...initialAddressData },
        },
        contactsTable: [],
        hr: {
            records: [],
            modalOpen: false,
            formData: {
                cliente: '',
                consecutivo: '',
                periodo: '',
                inicioDependent: '',
                inicioNoDependent: '',
                finDependent: '',
                finNoDependent: '',
            },
        },
        externalEntities: {
            nafinsa: {
                stratoEmpresa: '',
                sector: '',
            },
            buroCreditos: [],
            cnbv: {
                tipoClienteRelacionado: '',
                personalidadJuridica: '',
                esFondo: '',
            },
            banxico: {
                sectorEconomico: '',
            },
            infonavit: {
                afiliacion: '',
                credito: '',
            },
            infonavitRecords: [],
        },
    },
};

// ===== Slice =====

const prospectosSlice = createSlice({
    name: 'prospectos',
    initialState,
    reducers: {
        // UI Actions
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.ui.activeTab = action.payload;
        },
        setSearchOpen: (state, action: PayloadAction<boolean>) => {
            state.ui.searchOpen = action.payload;
        },

        // Person Type
        setPersonType: (state, action: PayloadAction<'moral' | 'fisica'>) => {
            state.form.personType = action.payload;
        },
        setSelectedProspect: (state, action: PayloadAction<string>) => {
            state.form.selectedProspect = action.payload;
        },

        // Personal Info
        updatePersonalInfo: (
            state,
            action: PayloadAction<Partial<PersonalInfoState>>,
        ) => {
            state.form.personalInfo = {
                ...state.form.personalInfo,
                ...action.payload,
            };
        },

        // Fisica
        updateFisica: (state, action: PayloadAction<Partial<FisicaState>>) => {
            state.form.fisica = { ...state.form.fisica, ...action.payload };
        },

        // Moral
        updateMoral: (state, action: PayloadAction<Partial<MoralState>>) => {
            state.form.moral = { ...state.form.moral, ...action.payload };
        },

        // Contact
        updateContact: (
            state,
            action: PayloadAction<Partial<ContactState>>,
        ) => {
            state.form.contact = { ...state.form.contact, ...action.payload };
        },

        // Address
        updateFiscalAddress: (
            state,
            action: PayloadAction<Partial<AddressData>>,
        ) => {
            state.form.address.fiscal = {
                ...state.form.address.fiscal,
                ...action.payload,
            };
        },
        updateCorrespondenciaAddress: (
            state,
            action: PayloadAction<Partial<AddressData>>,
        ) => {
            state.form.address.correspondencia = {
                ...state.form.address.correspondencia,
                ...action.payload,
            };
        },
        copyFiscalToCorrespondencia: (state) => {
            state.form.address.correspondencia = {
                ...state.form.address.fiscal,
            };
        },

        // Contacts Table
        addContactToTable: (state, action: PayloadAction<ContactTableItem>) => {
            state.form.contactsTable.push(action.payload);
        },
        updateContactInTable: (
            state,
            action: PayloadAction<ContactTableItem>,
        ) => {
            const index = state.form.contactsTable.findIndex(
                (c) => c.id === action.payload.id,
            );
            if (index !== -1) {
                state.form.contactsTable[index] = action.payload;
            }
        },
        deleteContactFromTable: (state, action: PayloadAction<string>) => {
            state.form.contactsTable = state.form.contactsTable.filter(
                (c) => c.id !== action.payload,
            );
        },

        // HR
        setHRModalOpen: (state, action: PayloadAction<boolean>) => {
            state.form.hr.modalOpen = action.payload;
        },
        updateHRFormData: (
            state,
            action: PayloadAction<Partial<HRFormData>>,
        ) => {
            state.form.hr.formData = {
                ...state.form.hr.formData,
                ...action.payload,
            };
        },
        addHRRecord: (state, action: PayloadAction<HRRecord>) => {
            state.form.hr.records.push(action.payload);
        },
        deleteHRRecord: (state, action: PayloadAction<string>) => {
            state.form.hr.records = state.form.hr.records.filter(
                (r) => r.id !== action.payload,
            );
        },
        clearHRFormData: (state) => {
            state.form.hr.formData = {
                cliente: '',
                consecutivo: '',
                periodo: '',
                inicioDependent: '',
                inicioNoDependent: '',
                finDependent: '',
                finNoDependent: '',
            };
        },

        // External Entities - Nafinsa
        updateNafinsa: (
            state,
            action: PayloadAction<Partial<ExternalEntitiesState['nafinsa']>>,
        ) => {
            state.form.externalEntities.nafinsa = {
                ...state.form.externalEntities.nafinsa,
                ...action.payload,
            };
        },

        // External Entities - Buro Creditos
        addBuroRecord: (state, action: PayloadAction<BuroRecord>) => {
            state.form.externalEntities.buroCreditos.push(action.payload);
        },
        updateBuroRecord: (state, action: PayloadAction<BuroRecord>) => {
            const index = state.form.externalEntities.buroCreditos.findIndex(
                (r) => r.id === action.payload.id,
            );
            if (index !== -1) {
                state.form.externalEntities.buroCreditos[index] =
                    action.payload;
            }
        },
        deleteBuroRecord: (state, action: PayloadAction<string>) => {
            state.form.externalEntities.buroCreditos =
                state.form.externalEntities.buroCreditos.filter(
                    (r) => r.id !== action.payload,
                );
        },

        // External Entities - CNBV
        updateCNBV: (
            state,
            action: PayloadAction<Partial<ExternalEntitiesState['cnbv']>>,
        ) => {
            state.form.externalEntities.cnbv = {
                ...state.form.externalEntities.cnbv,
                ...action.payload,
            };
        },

        // External Entities - Banxico
        updateBanxico: (
            state,
            action: PayloadAction<Partial<ExternalEntitiesState['banxico']>>,
        ) => {
            state.form.externalEntities.banxico = {
                ...state.form.externalEntities.banxico,
                ...action.payload,
            };
        },

        // External Entities - Infonavit
        updateInfonavit: (
            state,
            action: PayloadAction<Partial<ExternalEntitiesState['infonavit']>>,
        ) => {
            state.form.externalEntities.infonavit = {
                ...state.form.externalEntities.infonavit,
                ...action.payload,
            };
        },
        addInfonavitRecord: (state, action: PayloadAction<InfonavitRecord>) => {
            state.form.externalEntities.infonavitRecords.push(action.payload);
        },
        updateInfonavitRecord: (
            state,
            action: PayloadAction<InfonavitRecord>,
        ) => {
            const index =
                state.form.externalEntities.infonavitRecords.findIndex(
                    (r) => r.id === action.payload.id,
                );
            if (index !== -1) {
                state.form.externalEntities.infonavitRecords[index] =
                    action.payload;
            }
        },
        deleteInfonavitRecord: (state, action: PayloadAction<string>) => {
            state.form.externalEntities.infonavitRecords =
                state.form.externalEntities.infonavitRecords.filter(
                    (r) => r.id !== action.payload,
                );
        },

        // Utility
        resetForm: (state) => {
            state.form = initialState.form;
        },
    },
});

// ===== Exports =====

export const {
    setActiveTab,
    setSearchOpen,
    setPersonType,
    setSelectedProspect,
    updatePersonalInfo,
    updateFisica,
    updateMoral,
    updateContact,
    updateFiscalAddress,
    updateCorrespondenciaAddress,
    copyFiscalToCorrespondencia,
    addContactToTable,
    updateContactInTable,
    deleteContactFromTable,
    setHRModalOpen,
    updateHRFormData,
    addHRRecord,
    deleteHRRecord,
    clearHRFormData,
    updateNafinsa,
    addBuroRecord,
    updateBuroRecord,
    deleteBuroRecord,
    updateCNBV,
    updateBanxico,
    updateInfonavit,
    addInfonavitRecord,
    updateInfonavitRecord,
    deleteInfonavitRecord,
    resetForm,
} = prospectosSlice.actions;

export default prospectosSlice.reducer;
