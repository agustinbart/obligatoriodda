package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.obligatorio2dda.entity.Cliente;
import com.ctc.obligatorio2dda.repository.ClienteRepository;

@Service
public class ClienteServiceImpl implements ClienteService{

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<Cliente> findAll(){
        return clienteRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findById(Long Id){
        return clienteRepository.findById(Id);
    }

    @Override
    @Transactional
    public Cliente save(Cliente save){
        return clienteRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(Long Id){
        clienteRepository.deleteById(Id);
    }
}
