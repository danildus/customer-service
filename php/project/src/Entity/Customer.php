<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 * @UniqueEntity(
 *     fields={"email"},
 *     message="This email is already exist"
 * )
 */
class Customer
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(
     *     message = "The first name should not be blank."
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 20,
     *      minMessage = "Your first name must be at least {{ limit }} characters long",
     *      maxMessage = "Your first name cannot be longer than {{ limit }} characters"
     * )
     */
    private ?string $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(
     *     message = "The last name should not be blank."
     * )
     * @Assert\Length(
     *      min = 2,
     *      max = 20,
     *      minMessage = "Your last name must be at least {{ limit }} characters long",
     *      maxMessage = "Your last name cannot be longer than {{ limit }} characters"
     * )
     */
    private ?string $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true, unique=true)
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email."
     * )
     */
    private ?string $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Regex(
     *     pattern="/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/",
     *     message="Your phone number is incorrect"
     * )
     */
    private ?string $phoneNumber;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function toArray()
    {
        return [
            'id' => $this->getId(),
            'firstName' => $this->getFirstName(),
            'lastName' => $this->getLastName(),
            'email' => $this->getEmail(),
            'phoneNumber' => $this->getPhoneNumber()
        ];
    }
}
