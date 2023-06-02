package com.ctc.obligatorio2dda.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.ctc.obligatorio2dda.entity.Plan;
import com.ctc.obligatorio2dda.repository.ClienteRepository;
import com.ctc.obligatorio2dda.repository.PlanRepository;
import com.ctc.obligatorio2dda.service.PlanServiceImpl;

@CrossOrigin
@Controller
@RestController
@RequestMapping("api")
public class PlanController {
    @Autowired
    private PlanServiceImpl planServiceImpl;
    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping(value = "/agregarplan")
    public ResponseEntity<?> create(@RequestBody Plan plan) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(planServiceImpl.save(plan));
        } catch (Exception e) {
            HashMap<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/modificarplan/{id}")
    public ResponseEntity<Plan> update(@PathVariable("id") Long id, @RequestBody Plan plan) {
        Optional<Plan> planData = planServiceImpl.findById(id);

        if (planData.isPresent()) {
            Plan _plan = planData.get();
            _plan.setDestino(plan.getDestino());
            _plan.setFecha(plan.getFecha());
            _plan.setModalidad(plan.getModalidad());
            _plan.setPrecio(plan.getPrecio());
            _plan.setEliminado(plan.getEliminado());
            return new ResponseEntity<>(planServiceImpl.save(_plan), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/modificarplaneliminadoasi/{id}")
    public ResponseEntity<Plan> updateEliminadoASi(@PathVariable("id") Long id, @RequestBody Plan plan) {
        Optional<Plan> planData = planServiceImpl.findById(id);
        if (planData.isPresent()) {
            Plan _plan = planData.get();
            _plan.setDestino(plan.getDestino());
            _plan.setFecha(plan.getFecha());
            _plan.setModalidad(plan.getModalidad());
            _plan.setPrecio(plan.getPrecio());
            _plan.setEliminado("Si");
            return new ResponseEntity<>(planServiceImpl.save(_plan), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/modificarplaneliminadoano/{id}")
    public ResponseEntity<Plan> updateEliminadoANo(@PathVariable("id") Long id, @RequestBody Plan plan) {
        Optional<Plan> planData = planServiceImpl.findById(id);
        if (planData.isPresent()) {
            Plan _plan = planData.get();
            _plan.setDestino(plan.getDestino());
            _plan.setFecha(plan.getFecha());
            _plan.setModalidad(plan.getModalidad());
            _plan.setPrecio(plan.getPrecio());
            _plan.setEliminado("No");
            return new ResponseEntity<>(planServiceImpl.save(_plan), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/borrarplan/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id) {
        try {
            planServiceImpl.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/planes/{id}")
    public ResponseEntity<?> read(@PathVariable(value = "id") Long planId) {
        Optional<Plan> unPlan = planServiceImpl.findById(planId);
        if (!unPlan.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(unPlan);
    }

    @GetMapping("/planes")
    public List<Plan> readAll() {
        List<Plan> planes = StreamSupport
                .stream(planRepository.findAllPlanesNoEliminados().spliterator(), false)
                .collect(Collectors.toList());
        return planes;
    }

    @GetMapping("/planeseliminados")
    public List<Plan> readAllPlanesEliminados() {
        List<Plan> planes = StreamSupport
                .stream(planRepository.findAllPlanesEliminados().spliterator(), false)
                .collect(Collectors.toList());
        return planes;
    }

    @GetMapping("/planenplanesclientes/{planId}")
    public ResponseEntity<?> findPlanInPlanesClientes(@PathVariable(value = "planId") Long planId){
        Optional<Long> unPlan = planRepository.findPlanInPlanesClientes(planId);
        if (!unPlan.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(unPlan);
    }

    @GetMapping("/planescliente/{clienteId}")
    public ResponseEntity<List<Plan>> getPlanesByClienteId(@PathVariable(value = "clienteId") Long clienteId)
            throws Exception {
        if (!clienteRepository.existsById(clienteId)) {
            throw new Exception("No se encuentra cliente con id = " + clienteId);
        }
        List<Plan> planes = planRepository.findPlanesByClienteId(clienteId);
        return new ResponseEntity<>(planes, HttpStatus.OK);
    }

    @PostMapping(value = "/planescliente/{clienteId}/agregar")
    public ResponseEntity<Plan> addPlanCliente(@PathVariable(value = "clienteId") Long clienteId, @RequestBody Plan planRequest) {
        Optional<Plan> plan = clienteRepository.findById(clienteId).map(cliente -> {
            Long planId = planRequest.getId();

            if (planId != 0L) {
                Plan _plan = planRepository.findById(planId).get();
                cliente.addPlan(_plan);
                clienteRepository.save(cliente);
                return _plan;
            }

            cliente.addPlan(planRequest);
            return planRepository.save(planRequest);
        });

        return new ResponseEntity<>(plan.get(), HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping(value = "/planescliente/{clienteId}/borrar")
    public ResponseEntity<HttpStatus> deletePlanCliente(@PathVariable(value = "clienteId") Long clienteId,
            @RequestBody Plan planRequest) {
        try {
            Long planId = planRequest.getId();
            planRepository.deletePlanClienteById(planId, clienteId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/planessinasignar/{clienteId}")
    public List<Plan> readAllPlanesSinAsignar(@PathVariable("clienteId") Long clienteId) {
        List<Plan> planes = StreamSupport
                .stream(planRepository.findPlanesNotInPlanesCliente(clienteId).spliterator(), false)
                .collect(Collectors.toList());
        return planes;
    }
}