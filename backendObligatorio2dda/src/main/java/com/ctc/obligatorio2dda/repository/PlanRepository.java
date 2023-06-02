package com.ctc.obligatorio2dda.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ctc.obligatorio2dda.entity.Plan;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query(value = "SELECT p.* FROM planes p INNER JOIN planes_clientes pc ON p.id = pc.plan_id WHERE pc.cliente_id = :clienteId", nativeQuery = true)
    public List<Plan> findPlanesByClienteId(@Param("clienteId") Long clienteId);

    @Query(value = "DELETE FROM planes_clientes WHERE cliente_id = :clienteId AND plan_id = :planId", nativeQuery = true)
    @Modifying
    public void deletePlanClienteById(@Param("planId") Long planId, @Param("clienteId") Long clienteId);

    @Query(value = "SELECT p.* FROM planes p WHERE p.eliminado = 'No'", nativeQuery = true)
    public List<Plan> findAllPlanesNoEliminados();

    @Query(value = "SELECT p.* FROM planes p WHERE p.eliminado = 'Si'", nativeQuery = true)
    public List<Plan> findAllPlanesEliminados();

    @Query(value = "SELECT p.* FROM planes p WHERE p.eliminado = 'No' AND p.id NOT IN (SELECT p.id FROM planes p INNER JOIN planes_clientes pc ON p.id = pc.plan_id WHERE pc.cliente_id = :clienteId)", nativeQuery = true)
    public List<Plan> findPlanesNotInPlanesCliente(@Param("clienteId") Long clienteId);

    @Query(value = "SELECT pc.plan_id FROM planes_clientes pc WHERE pc.plan_id = :planId", nativeQuery = true)
    public Optional<Long> findPlanInPlanesClientes(@Param("planId") Long planId);
}