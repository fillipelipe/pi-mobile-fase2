import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrcamentosContext = createContext();

const initialState = {
  orcamentos: [],
  ordensDeServico: [],
  selectedCheckbox: null,
};

function orcamentosReducer(state, action) {
  switch (action.type) {
    case "ADICIONAR_ORCAMENTO":
      return {
        ...state,
        orcamentos: [...state.orcamentos, action.payload],
      };
    case "EDITAR_ORCAMENTO":
      return {
        ...state,
        orcamentos: state.orcamentos.map((orcamento) =>
          orcamento.numero === action.payload.numero
            ? { ...orcamento, ...action.payload }
            : orcamento
        ),
      };
    case "REMOVER_ORCAMENTO":
      return {
        ...state,
        orcamentos: state.orcamentos.filter(
          (orcamento) => orcamento.numero !== action.payload.numero
        ),
      };
    case "ADICIONAR_ORDEM_DE_SERVICO":
      return {
        ...state,
        ordensDeServico: [...state.ordensDeServico, action.payload],
      };
    case "ATUALIZAR_STATUS_APROVADO":
      return {
        ...state,
        orcamentos: state.orcamentos.map((orcamento) =>
          orcamento.numero === action.payload.numeroOrcamento
            ? { ...orcamento, aprovado: action.payload.aprovado }
            : orcamento
        ),
      };
    case "ATUALIZAR_NOME_TECNICO":
      return {
        ...state,
        orcamentos: state.orcamentos.map((orcamento) =>
          orcamento.numero === action.payload.numeroOrcamento
            ? { ...orcamento, nomeTecnico: action.payload.nomeTecnico }
            : orcamento
        ),
      };
    case "ATUALIZAR_CHECKBOX": // Novo case para atualizar o estado do checkbox
      return {
        ...state,
        orcamentos: state.orcamentos.map((orcamento) =>
          orcamento.numero === action.payload.numeroOrcamento
            ? { ...orcamento, selectedCheckbox: action.payload.checkbox }
            : orcamento
        ),
      };
    case "CARREGAR_ORCAMENTOS":
      return {
        ...state,
        orcamentos: action.payload,
      };
    default:
      return state;
  }
}

export function useOrcamentos() {
  return useContext(OrcamentosContext);
}

export function OrcamentosProvider({ children }) {
  const [state, dispatch] = useReducer(orcamentosReducer, initialState);

  const updateAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem(
        "orcamentos",
        JSON.stringify(state.orcamentos)
      );
    } catch (error) {
      console.error("Erro ao atualizar AsyncStorage:", error);
    }
  };

  useEffect(() => {
    updateAsyncStorage();
  }, [state.orcamentos]);

  const loadAsyncStorage = async () => {
    try {
      const orcamentosData = await AsyncStorage.getItem("orcamentos");
      if (orcamentosData !== null) {
        dispatch({
          type: "CARREGAR_ORCAMENTOS",
          payload: JSON.parse(orcamentosData),
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadAsyncStorage();
  }, []);

  const adicionarNovoOrcamento = (novoOrcamento) => {
    dispatch({ type: "ADICIONAR_ORCAMENTO", payload: novoOrcamento });
  };

  const editarOrcamento = (orcamentoEditado) => {
    dispatch({ type: "EDITAR_ORCAMENTO", payload: orcamentoEditado });
  };

  const removerOrcamento = (numeroOrcamento) => {
    dispatch({
      type: "REMOVER_ORCAMENTO",
      payload: { numero: numeroOrcamento },
    });
  };

  const adicionarOrdemDeServico = (novaOrdem) => {
    dispatch({ type: "ADICIONAR_ORDEM_DE_SERVICO", payload: novaOrdem });
  };

  const atualizarStatusAprovado = (numeroOrcamento, aprovado) => {
    dispatch({
      type: "ATUALIZAR_STATUS_APROVADO",
      payload: { numeroOrcamento, aprovado },
    });
  };

  const atualizarNomeTecnico = (numeroOrcamento, nomeTecnico) => {
    dispatch({
      type: "ATUALIZAR_NOME_TECNICO",
      payload: { numeroOrcamento, nomeTecnico },
    });
  };

  const atualizarCheckbox = (numeroOrcamento, checkbox) => {
    dispatch({
      type: "ATUALIZAR_CHECKBOX",
      payload: { numeroOrcamento, checkbox },
    });
  };

  const contextValue = useMemo(
    () => ({
      orcamentos: state.orcamentos,
      ordensDeServico: state.ordensDeServico,
      adicionarNovoOrcamento,
      editarOrcamento,
      removerOrcamento,
      adicionarOrdemDeServico,
      atualizarStatusAprovado,
      atualizarNomeTecnico,
      atualizarCheckbox,
    }),
    [state.orcamentos, state.ordensDeServico]
  );

  return (
    <OrcamentosContext.Provider value={contextValue}>
      {children}
    </OrcamentosContext.Provider>
  );
}
