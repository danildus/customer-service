<?php

namespace App\Controller;

use App\Service\CustomerService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class CustomerController
{

    public function __construct() {}

    /**
     * @Route("/api/customers/{id}", name="get_one_customer", methods={"GET"})
     * @param $id
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function get($id, CustomerService $customerService): JsonResponse
    {
        $result = $customerService->get($id);

        return new JsonResponse($result, Response::HTTP_OK);
    }

    /**
     * @Route("/api/customers/{params}/{value}", name="get_customer_by", methods={"GET"})
     * @param $value
     * @param $params
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function getByParams($value, $params, CustomerService $customerService): JsonResponse
    {
        $result = $customerService->getBy($value, $params);

        return new JsonResponse($result, Response::HTTP_OK);
    }

    /**
     * @Route("/api/customers", name="get_all_customer", methods={"GET"})
     * @param CustomerService $customerService
     * @return JsonResponse
     */

    public function getAll(CustomerService $customerService): JsonResponse
    {
        $result = $customerService->getAll();

        return new JsonResponse($result, Response::HTTP_OK);
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

        $customerService->save($firstName, $lastName, $email ,$phoneNumber);

        return new JsonResponse(['status' => 'Customer created!'], Response::HTTP_CREATED);
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

        $updateCustomer = $customerService->update($id, $firstName, $lastName, $email, $phoneNumber);

        return new JsonResponse($updateCustomer->toArray(), Response::HTTP_OK);
    }

    /**
     * @Route("/api/customers/{id}", name="delete_customer", methods={"DELETE"})
     * @param $id
     * @param CustomerService $customerService
     * @return JsonResponse
     */
    public function delete($id, CustomerService $customerService): JsonResponse
    {
        $customerService->delete($id);

        return new JsonResponse(['status' => 'Customer deleted'], Response::HTTP_NO_CONTENT);
    }

}