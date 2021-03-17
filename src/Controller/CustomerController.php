<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CustomerController
{
    private $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    /**
     * @Route("/customers/{id}", name="get_one_customer", methods={"GET"})
     * @param $id
     * @return JsonResponse
     */
    public function get($id): JsonResponse
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);

        $data = [
            'id' => $customer->getId(),
            'firstName' => $customer->getFirstName(),
            'lastName' => $customer->getLastName(),
            'email' => $customer->getEmail(),
            'phoneNumber' => $customer->getPhoneNumber(),
        ];

        return new JsonResponse($data, Response::HTTP_OK);
    }

    /**
     * @Route("/customers/add", name="add_customer", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $email = $data['email'];
        $phoneNumber = $data['phoneNumber'];

        if (empty($firstName) || empty($lastName) || empty($email) || empty($phoneNumber)) {
            throw new NotFoundHttpException('Expecting mandatory parameters!');
        }

        $this->customerRepository->saveCustomer($firstName, $lastName, $email, $phoneNumber);

        return new JsonResponse(['status' => 'Customer created!'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/customers/update/{id}", name="update_customer", methods={"PUT"})
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request): JsonResponse
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);
        $data = json_decode($request->getContent(), true);

        empty($data['firstName']) ? true : $customer->setFirstName($data['firstName']);
        empty($data['lastName']) ? true : $customer->setLastName($data['lastName']);
        empty($data['email']) ? true : $customer->setEmail($data['email']);
        empty($data['phoneNumber']) ? true : $customer->setPhoneNumber($data['phoneNumber']);

        $updatedCostumer = $this->customerRepository->updateCustomer($customer);

        return new JsonResponse($updatedCostumer->toArray(), Response::HTTP_OK);
    }

    /**
     * @Route("/customers/delete/{id}", name="delete_customer", methods={"DELETE"})
     * @param $id
     * @return JsonResponse
     */
    public function delete($id): JsonResponse
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);

        $this->customerRepository->removeCustomer($customer);

        return new JsonResponse(['status' => 'Customer deleted'], Response::HTTP_NO_CONTENT);
    }

}