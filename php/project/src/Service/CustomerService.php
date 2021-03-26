<?php

namespace App\Service;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validation;


class CustomerService
{

    private CustomerRepository $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function save($firstName, $lastName, $email, $phoneNumber): JsonResponse
    {
        $newCustomer = new Customer();
        $newCustomer
            ->setFirstName($firstName)
            ->setLastName($lastName)
            ->setEmail($email)
            ->setPhoneNumber($phoneNumber);

        $validator = Validation::createValidatorBuilder()
            ->enableAnnotationMapping()
            ->getValidator();
        $errors = $validator->validate($newCustomer);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
               $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse($errorMessages, Response::HTTP_BAD_REQUEST);
        }

        $this->customerRepository->saveCustomer($newCustomer);
        return new JsonResponse(['status' => 'Customer created!'], Response::HTTP_CREATED);
    }

    public function update($id, $firstName, $lastName, $email, $phoneNumber): JsonResponse
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);
        $customer->setFirstName($firstName);
        $customer->setLastName($lastName);
        $customer->setEmail($email);
        $customer->setPhoneNumber($phoneNumber);

        $validator = Validation::createValidatorBuilder()
            ->enableAnnotationMapping()
            ->getValidator();
        $errors = $validator->validate($customer);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return new JsonResponse($errorMessages, Response::HTTP_BAD_REQUEST);
        }

        $updatedCustumer = $this->customerRepository->updateCustomer($customer);
        return new JsonResponse($updatedCustumer->toArray(), Response::HTTP_OK);
    }

    public function delete($id)
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);

        if (!$customer){
            return new JsonResponse(['status' => 'Customer not found'], Response::HTTP_BAD_REQUEST);
        }

        $this->customerRepository->removeCustomer($customer);
        return new JsonResponse(['status' => 'Customer deleted'], Response::HTTP_NO_CONTENT);
    }

    public function getAll(): JsonResponse
    {
        $customers = $this->customerRepository->findAll();

        $result = [];
        foreach ($customers as $customer) {
            $data = [
                'id' => $customer->getId(),
                'firstName' => $customer->getFirstName(),
                'lastName' => $customer->getLastName(),
                'email' => $customer->getEmail(),
                'phoneNumber' => $customer->getPhoneNumber(),
            ];
            $result[] = $data;
        }

        return new JsonResponse($result, Response::HTTP_OK);
    }

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
}