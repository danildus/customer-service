<?php

namespace App\Service;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class CustomerService
{
    private CustomerRepository $customerRepository;
    /**
     * @var ValidatorInterface
     */
    private ValidatorInterface $validator;

    public function __construct(CustomerRepository $customerRepository, ValidatorInterface $validator)
    {
        $this->customerRepository = $customerRepository;
        $this->validator = $validator;
    }

    public function action($customer, $firstName, $lastName, $email, $phoneNumber)
    {
        $customer->setFirstName($firstName);
        $customer->setLastName($lastName);
        $customer->setEmail($email);
        $customer->setPhoneNumber($phoneNumber);

        $errors = $this->validator->validate($customer);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            throw new BadRequestHttpException(implode('', $errorMessages));
        }

        return $customer;
    }

    public function save($firstName, $lastName, $email, $phoneNumber)
    {
        $newCustomer = new Customer();
        $newCustomer = $this->action($newCustomer, $firstName, $lastName, $email, $phoneNumber);

        $this->customerRepository->saveCustomer($newCustomer);
    }

    public function update($id, $firstName, $lastName, $email, $phoneNumber): Customer
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);
        $customer = $this->action($customer, $firstName, $lastName, $email, $phoneNumber);

        return $this->customerRepository->updateCustomer($customer);
    }

    public function delete($id)
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);

        if (!$customer){
            throw new BadRequestHttpException('Customer not found');
        }

        $this->customerRepository->removeCustomer($customer);
    }

    public function getBy($value, $params): array
    {
        $qb = $this->customerRepository->createQueryBuilder('customer');
        $customers = $qb
            ->where($qb->expr()->orX(
                $qb->expr()->like('customer.' . $params, ':value')
            ))
            ->setParameter('value', '%'.$value.'%')
            ->getQuery()
            ->getResult();

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
        return $result;
    }

    public function getAll(): array
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

        return $result;
    }

    public function get($id): array
    {
        $customer = $this->customerRepository->findOneBy(['id' => $id]);

        return [
            'id' => $customer->getId(),
            'firstName' => $customer->getFirstName(),
            'lastName' => $customer->getLastName(),
            'email' => $customer->getEmail(),
            'phoneNumber' => $customer->getPhoneNumber(),
        ];
    }
}