package com.ctc.obligatorio2dda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.ctc.obligatorio2dda.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    @Query(value = "SELECT c.ci FROM cliente c WHERE c.ci IN(SELECT pc.cliente_id FROM planes_clientes pc GROUP BY pc.cliente_id HAVING COUNT(pc.cliente_id) >= 3) AND c.tipo = 'Estandar' LIMIT 1" , nativeQuery = true)
    public Long findClienteEstandarToPremium();

    @Query(value = "SELECT c.ci FROM cliente c WHERE c.ci NOT IN(SELECT pc.cliente_id FROM planes_clientes pc GROUP BY pc.cliente_id HAVING COUNT(pc.cliente_id) >= 3) AND c.tipo = 'Premium' LIMIT 1" , nativeQuery = true)
    public Long findClientePremiumToEstandar();
}