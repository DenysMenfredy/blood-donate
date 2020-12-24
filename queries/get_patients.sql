CREATE OR REPLACE FUNCTION get_patients(doador_id INT)
RETURNS TABLE(id INT, nome VARCHAR, idade INT, sexo VARCHAR, tipo_sanguineo VARCHAR, motivo TEXT) AS 
$$
DECLARE blood_type VARCHAR;
BEGIN
	SELECT doador.tipo_sanguineo INTO blood_type FROM doador WHERE id_doador=doador_id;
	
	IF blood_type='A+' THEN
	RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='A+' OR p.tipo_sanguineo='AB+';
		
	ELSIF blood_type='B+' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='B+' OR p.tipo_sanguineo='AB+';
	
	ELSIF blood_type='A-' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='A+' OR p.tipo_sanguineo='A-' OR p.tipo_sanguineo='AB+' OR p.tipo_sanguineo='AB-';
	
	ELSIF blood_type='B-' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='B+' OR p.tipo_sanguineo='B-' OR p.tipo_sanguineo='AB+' OR p.tipo_sanguineo='AB-';
	
	ELSIF blood_type='AB+' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='AB+';
		
	ELSIF blood_type='AB-' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='AB+' OR p.tipo_sanguineo='AB-';
		
	ELSIF blood_type='O+' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='A+' OR p.tipo_sanguineo='B+' OR p.tipo_sanguineo='AB+' OR p.tipo_sanguineo='O+';
		
	ELSIF blood_type='O-' THEN
		RETURN QUERY SELECT p.id_paciente, p.nome, p.idade, p.sexo, p.tipo_sanguineo, p.motivo FROM paciente p WHERE p.tipo_sanguineo='A+' OR p.tipo_sanguineo='A-' OR p.tipo_sanguineo='B+' OR p.tipo_sanguineo='B-' OR p.tipo_sanguineo='AB+' OR p.tipo_sanguineo='AB-' OR p.tipo_sanguineo='O+' OR p.tipo_sanguineo='O-';
	END IF;
END;
$$ LANGUAGE plpgsql
