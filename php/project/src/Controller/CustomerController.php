<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use App\Service\CustomerService;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class CustomerController
{
    private CustomerRepository $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    /**
     * @Route("/customers/{id}", name="get_one_customer", methods={"GET"})
     * @param $id
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function get($id, CustomerService $customerService): JsonResponse
    {
        return $customerService->get($id);
    }

    /**
     * @Route("/api/customers", name="get_all_customer", methods={"GET"})
     * @param CustomerService $customerService
     * @return JsonResponse
     */

    public function getAll(CustomerService $customerService): JsonResponse
    {
        return $customerService->getAll();
    }

    /**
     * @Route("/api/customers", name="add_customer", methods={"POST"})
     * @param Request $request
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function add(Request $request, CustomerService $customerService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $phoneNumber = $data['phoneNumber'];

        return $customerService->save($firstName, $lastName, $email ,$phoneNumber);
    }

    /**
     * @Route("/api/customers/{id}", name="update_customer", methods={"PUT"})
     * @param $id
     * @param Request $request
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function update($id, Request $request, CustomerService $customerService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $phoneNumber = $data['phoneNumber'];

        return $customerService->update($id, $firstName, $lastName, $email, $phoneNumber);
    }

    /**
     * @Route("/api/customers/{id}", name="delete_customer", methods={"DELETE"})
     * @param $id
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function delete($id, CustomerService $customerService): JsonResponse
    {
        return $customerService->delete($id);
    }

}