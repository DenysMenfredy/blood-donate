CREATE OR REPLACE FUNCTION num_donations(doador_id INT) RETURNS INT AS
$$
DECLARE 
	doacoes_pacientes INT;
	doacoes_bancos INT;
BEGIN
	SELECT COUNT(*) INTO doacoes_pacientes FROM doacao_paciente dp WHERE dp.id_doador=doador_id;
	SELECT COUNT(*) INTO doacoes_bancos FROM doacao_banco db WHERE db.id_doador=doador_id;
	
	RETURN doacoes_pacientes + doacoes_bancos;
	
END;
$$ LANGUAGE plpgsql;