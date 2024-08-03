import { Request, Response } from "express";
import { InitProfessorUseCase } from "../services/professor/InitProfessorUseCase";
import { LoginProfessorUseCase } from "../services/professor/LoginProfessorUseCase";
import { ValidateProfessorUseCase } from "../services/professor/ValidateProfessorUseCase";
import { ValidateRecoveryUseCase } from "../services/professor/ValidateRecoveryUseCase";
import { RecoveryProfessorUseCase } from "../services/professor/RecoveryProfessorUseCase";
import { RefreshTokenUseCase } from "../services/professor/RefreshTokenUseCase";
import { CreateActivityUseCase } from "../services/professor/CreateActivityUseCase";
import { RelateAlunoAtividadeUseCase } from "../services/professor/LinkAlunoActivityUseCase";
import { EntidadeEnum } from "../interfaces/sharedDTOs";
import { GetMessagesBetweenUseCase } from "../services/shared/GetChatUseCase";

export class InitProfessorController {
    async handle(req: Request, res: Response) {
        const email = req.query.email as string;

        const initProfessorUseCase = new InitProfessorUseCase();

        const result = await initProfessorUseCase.execute({ email });

        return res.status(201).json(result);
    }
}

export class LoginProfessorController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginProfessorUseCase = new LoginProfessorUseCase();

        const result = await loginProfessorUseCase.execute({ email, password });

        return res.status(201).json(result);
    }
}

export class ValidateProfessorController {
    async handle(req: Request, res: Response) {
        const { email, temporaryPassword, newPassword } = req.body;

        const validateProfessorUseCase = new ValidateProfessorUseCase();

        const result = await validateProfessorUseCase.execute({ email, temporaryPassword, newPassword });

        return res.status(201).json(result);
    }
}

export class RecoveryProfessorController {
    async handle(req: Request, res: Response) {
        const { name, email } = req.body;

        const recoveryProfessorUSecase = new RecoveryProfessorUseCase();

        const result = await recoveryProfessorUSecase.execute({ name, email });

        return res.status(201).json(result);
    }
}

export class ValidateRecoveryController {
    async handle(req: Request, res: Response) {
        const { email, recoveryPass, newPass } = req.body;

        const validateRecoveryUseCase = new ValidateRecoveryUseCase();

        const result = await validateRecoveryUseCase.execute({ email, recoveryPass, newPass });

        return res.status(201).json(result);
    }
}

export class RefreshTokenController {
    async handle(req: Request, res: Response) {
        const email = req.body.entidade.email;

        const refreshTokenUseCase = new RefreshTokenUseCase();

        const result = await refreshTokenUseCase.execute(email);

        return res.status(201).json(result);
    }
}

export class CreateActivityController {
    async handle(req: Request, res: Response) {
        const professorId = req.body.entidade.id;
        const {title, descricao} = req.body;
        const imagem = req.file as Express.Multer.File;
        
        const createActivityUseCase = new CreateActivityUseCase();

        const result = await createActivityUseCase.execute({title, descricao, professorId, imagem});

        return res.status(201).json(result);
    }
}

export class RelateAlunoAtividadeController {
    async handle(req: Request, res: Response) {
        const professorId = req.body.entidade.id;
        const {alunoId, atividadeId, mencao} = req.body;
        
        const relateAlunoAtividadeUseCase = new RelateAlunoAtividadeUseCase();

        const result = await relateAlunoAtividadeUseCase.execute({alunoId, atividadeId, professorId, mencao});

        return res.status(201).json(result);
    }
}

export class GetMessagesBetweenController {
    async handle(req: Request, res: Response) {
        const email1 = req.body.entidade.email as string;
        const identifier1 = "PROFESSOR" as EntidadeEnum;

        const email2 = req.query.email2 as string;
        const identifier2 = req.query.identifier2 as EntidadeEnum;

        if (!email2 || !identifier2) {
            return res.status(400).json({ error: "Parâmetros insuficientes ou inválidos." });
        }

        const getMessagesBetween = new GetMessagesBetweenUseCase();

        const result = await getMessagesBetween.execute({ email1, identifier1, email2, identifier2 });

        return res.status(201).json(result);
    }
}