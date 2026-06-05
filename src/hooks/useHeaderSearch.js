import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export function useHeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Redireciona para a página de busca caso o usuário esteja em outra rota, ou atualiza a query na home
    if (window.location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      return;
    }

    // Se estiver na Home, apenas atualiza os parâmetros da URL
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    navigate("/");
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
    clearSearch,
  };
}
